<?php

namespace App\Support;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

// Editable copy from table site_contents (written by the ERP), falling back to the lang/config files.
// Each key's label, translatability and value shape: resources/content/site-content.schema.json.
class SiteContent
{
    public const SITE = 'overseas';

    public const SCHEMA = 'resources/content/site-content.schema.json';

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

    /** Valid row for the current locale → valid en row → $default. A stored value is always the complete value of the key. */
    public static function get(string $key, mixed $default): mixed
    {
        $def = self::schema()[$key] ?? null;
        $locale = ($def['translatable'] ?? true) ? app()->getLocale() : 'en';

        foreach (array_unique([$locale, 'en']) as $l) {
            $row = self::rows($l)[$key] ?? null;
            if ($row === null) {
                continue;
            }
            $value = $def ? self::validate($def['value'], $row) : null;
            if ($value !== null) {
                return $value;
            }
            self::logOnce("invalid:{$key}:{$l}", "SiteContent: row {$key} ({$l}) does not match the schema; using the default.");
        }

        return $default;
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

    public static function schema(): array
    {
        return self::$schema ??= json_decode(file_get_contents(base_path(self::SCHEMA)), true, flags: JSON_THROW_ON_ERROR)['keys'];
    }

    /** $value normalised to the field's shape, or null when it does not match (wrong type, missing required, too few items, bad option). */
    public static function validate(array $field, mixed $value): mixed
    {
        $required = $field['required'] ?? false;
        if ($value === null || $value === '' || $value === []) {
            return $required ? null : ($field['type'] === 'list' || $field['type'] === 'items' ? [] : null);
        }

        switch ($field['type']) {
            case 'number':
                $ok = is_int($value) || is_float($value);
                break;
            case 'list':
            case 'items':
                if (! is_array($value) || ! array_is_list($value) || count($value) < ($field['min_items'] ?? 0)) {
                    return null;
                }
                $out = [];
                foreach ($value as $item) {
                    $item = $field['type'] === 'list'
                        ? (is_string($item) ? $item : null)
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
                $ok = is_string($value);
        }

        return $ok && (! isset($field['options']) || in_array($value, $field['options'], true)) ? $value : null;
    }

    /** key => decoded value for one locale. Cached 10 min; the cache key changes whenever a row is added, removed or updated. */
    private static function rows(string $locale): array
    {
        $memo = request()->attributes; // per request: one lookup, and after a failure no further DB attempts
        if ($memo->get('site_content.failed')) {
            return [];
        }
        if ($memo->has("site_content.{$locale}")) {
            return $memo->get("site_content.{$locale}");
        }

        try {
            $stamp = DB::table('site_contents')->where('site', self::SITE)
                ->selectRaw('max(updated_at) as u, count(*) as c')->first();
            $rows = Cache::remember(
                'site_content:'.self::SITE.":{$locale}:".md5($stamp->u.'|'.$stamp->c),
                600,
                fn () => DB::table('site_contents')->where('site', self::SITE)->where('locale', $locale)
                    ->pluck('value', 'key')->map(fn ($v) => json_decode($v, true))->all(),
            );
        } catch (Throwable $e) {
            $memo->set('site_content.failed', true);
            self::logOnce('db', 'SiteContent: site_contents unavailable, using file defaults: '.$e->getMessage());

            return [];
        }

        $memo->set("site_content.{$locale}", $rows);

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
