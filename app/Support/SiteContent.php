<?php

namespace App\Support;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

// Editable copy from table site_contents (written by the ERP), falling back to the lang/config files.
// Each key's label, translatability and value shape: resources/content/site-content.schema.json.
class SiteContent
{
    public const SITE = 'overseas';

    public const SCHEMA = 'resources/content/site-content.schema.json';

    /** The defaults for the ERP editor's prefill, written by `php artisan site-content:export --json`. */
    public const DEFAULTS_FILE = 'resources/content/site-content.defaults.json';

    /** Where each key's default lives: lang:<file>.<path> (the shared translations), config:<path>, const:<PHP constant>. */
    public const SOURCES = [
        'site.company' => 'config:site',
        'site.contact' => 'config:site.contact',
        'site.licence' => 'config:site.licence',
        'site.stats' => 'config:site.stats',
        'site.privacy' => 'config:site.privacy',
        'home.meta' => 'lang:home.meta',
        'home.nav' => 'lang:home.nav',
        'home.hero' => 'lang:home.hero',
        'home.fork' => 'lang:home.fork',
        'home.fork.candidate' => 'lang:home.fork.candidate',
        'home.fork.employer' => 'lang:home.fork.employer',
        'home.jobs' => 'lang:home.jobs',
        'home.journey' => 'lang:home.journey',
        'home.industries' => 'lang:home.industries',
        'home.destinations' => 'lang:home.destinations',
        'home.costs' => 'lang:home.costs',
        'home.reviews' => 'lang:home.reviews',
        'home.faq' => 'lang:home.faq',
        'home.final' => 'lang:home.final',
        'home.footer' => 'lang:home.footer',
        'pages.common' => 'lang:pages',
        'pages.industries' => 'lang:pages.industries',
        'pages.countries' => 'lang:pages.countries',
        'pages.countries.region_lead' => 'lang:pages.countries.region_lead',
        'hubs.jobs' => 'lang:hubs.jobs',
        'hubs.work_abroad' => 'lang:hubs.work_abroad',
        'hubs.employers' => 'lang:hubs.employers',
        'hubs.about' => 'lang:hubs.about',
        'contact.page' => 'lang:contact',
        'contact.consent' => 'lang:contact.form',
        'privacy.page' => 'lang:privacy',
        'documents.base' => 'const:Database\Seeders\CountrySeeder::BASE_DOCS',
    ];

    private static ?array $schema = null;

    private static array $logged = [];

    /** Schema note on fields whose default comes from .env: a blank (null) stored value means "use the server setting". */
    public const ENV_NOTE = 'Defaults to the server setting';

    /**
     * Valid row for the current locale → $default (the locale's own file value; never another locale's row).
     * Non-translatable keys use the en row. A stored value is always the complete value of the key.
     */
    public static function get(string $key, mixed $default): mixed
    {
        $def = self::schema()[$key] ?? null;
        $locale = ($def['translatable'] ?? true) ? app()->getLocale() : 'en';

        $row = self::rows()[$locale][$key] ?? null;
        if ($row === null) {
            return $default;
        }
        $value = $def ? self::validate($def['value'], $row) : null;
        if ($value === null) {
            self::logOnce("invalid:{$key}:{$locale}", "SiteContent: row {$key} ({$locale}) does not match the schema; using the default.");

            return $default;
        }
        foreach (self::envFields($key) as $f) {
            $value[$f] ??= $default[$f] ?? null;
        }

        return $value;
    }

    /** Fields of $key marked ENV_NOTE in the schema (their default is read from .env via config/site.php). */
    public static function envFields(string $key): array
    {
        return array_keys(array_filter(self::schema()[$key]['value']['fields'] ?? [], fn ($f) => ($f['note'] ?? null) === self::ENV_NOTE));
    }

    /** Applies every key whose source is "<kind>:<path>" to $tree (the lang tree, or ['site' => config('site')]). */
    public static function apply(string $kind, array $tree): array
    {
        foreach (self::SOURCES as $key => $source) {
            [$k, $path] = explode(':', $source, 2);
            if ($k !== $kind || ! is_array($sub = data_get($tree, $path))) {
                continue;
            }
            $fields = array_keys(self::schema()[$key]['value']['fields']);
            data_set($tree, $path, array_replace($sub, self::get($key, array_intersect_key($sub, array_flip($fields)))));
        }

        return $tree;
    }

    /** File/config defaults for every key in $locale, limited to the schema fields: what the site shows with an empty table. */
    public static function defaults(string $locale): array
    {
        $trees = ['lang' => HandleInertiaRequests::translations($locale), 'config' => ['site' => config('site')]];

        return collect(self::SOURCES)->map(function (string $source, string $key) use ($trees) {
            [$kind, $path] = explode(':', $source, 2);
            if ($kind === 'const') {
                return constant($path);
            }
            $fields = self::schema()[$key]['value']['fields'];

            return array_map(fn ($f) => data_get($trees[$kind], "{$path}.{$f}"), array_combine(array_keys($fields), array_keys($fields)));
        })->all();
    }

    /**
     * key => [en => value, bn => value|null]: what the site falls back to with no row. .env-backed fields are null
     * (so the server setting keeps winning); bn is null when the key is not translatable or its bn text is still the en text.
     */
    public static function defaultsForEditor(): array
    {
        $en = self::defaults('en');
        $bn = self::defaults('bn');
        $out = [];
        foreach (self::schema() as $key => $def) {
            $null = array_fill_keys(self::envFields($key), null);
            $out[$key] = [
                'en' => array_replace($en[$key], $null),
                'bn' => $def['translatable'] && $bn[$key] !== $en[$key] ? array_replace($bn[$key], $null) : null,
            ];
        }

        return $out;
    }

    public static function schema(): array
    {
        return self::$schema ??= json_decode(file_get_contents(base_path(self::SCHEMA)), true, flags: JSON_THROW_ON_ERROR)['keys'];
    }

    /** $value normalised to the field's shape, or null when it does not match (wrong type or shape, missing required, item count, length, range, bad option). */
    public static function validate(array $field, mixed $value): mixed
    {
        $required = $field['required'] ?? false;
        if ($value === null || $value === '' || $value === []) {
            return $required ? null : ($field['type'] === 'list' || $field['type'] === 'items' ? [] : null);
        }

        switch ($field['type']) {
            case 'number':
                $ok = (is_int($value) || is_float($value)) && $value >= ($field['min'] ?? -INF) && $value <= ($field['max'] ?? INF);
                break;
            case 'list':
            case 'items':
                if (! is_array($value) || ! array_is_list($value) || count($value) < ($field['min_items'] ?? 0)
                    || count($value) > ($field['max_items'] ?? PHP_INT_MAX)) {
                    return null;
                }
                $out = [];
                foreach ($value as $item) {
                    $item = $field['type'] === 'list'
                        ? (is_string($item) && mb_strlen($item) <= ($field['max'] ?? PHP_INT_MAX) ? $item : null)
                        : self::validate(['type' => 'group', 'required' => true, 'fields' => $field['fields']], $item);
                    if ($item === null) {
                        return null;
                    }
                    $out[] = $item;
                }

                return $out;
            case 'group':
                if (! is_array($value) || array_is_list($value)) {
                    return null;
                }
                $out = [];
                foreach ($field['fields'] as $name => $sub) {
                    $v = self::validate($sub, $value[$name] ?? null);
                    if ($v === null && ($sub['required'] ?? false)) {
                        return null;
                    }
                    $out[$name] = $v;
                }

                return $out;
            default: // text, textarea, url, email, phone, image
                $ok = is_string($value) && mb_strlen($value) <= ($field['max'] ?? PHP_INT_MAX) && match ($field['type']) {
                    'url' => (bool) preg_match('#^https?://\S+$#i', $value),
                    'phone' => (bool) preg_match('/^\+?[0-9 ()-]{6,20}$/', $value),
                    'email' => filter_var($value, FILTER_VALIDATE_EMAIL) !== false,
                    default => true,
                };
        }

        return $ok && (! isset($field['options']) || in_array($value, $field['options'], true)) ? $value : null;
    }

    /**
     * locale => key => decoded value. One query per request, memoised (no cache: ~60 small rows cost less than a
     * database-cache lookup, and an ERP save shows on the next request). After a failure no further DB attempts.
     */
    private static function rows(): array
    {
        $memo = request()->attributes;
        if ($memo->has('site_content.rows')) {
            return $memo->get('site_content.rows');
        }

        $rows = [];
        try {
            foreach (DB::table('site_contents')->where('site', self::SITE)->get(['key', 'locale', 'value']) as $r) {
                $rows[$r->locale][$r->key] = json_decode($r->value, true);
            }
        } catch (Throwable $e) {
            $rows = [];
            self::logOnce('db', 'SiteContent: site_contents unavailable, using file defaults: '.$e->getMessage());
        }
        $memo->set('site_content.rows', $rows);

        return $rows;
    }

    private static function logOnce(string $id, string $message): void
    {
        if (! isset(self::$logged[$id])) {
            self::$logged[$id] = true;
            Log::warning($message);
        }
    }
}
