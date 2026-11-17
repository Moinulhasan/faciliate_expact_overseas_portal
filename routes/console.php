<?php

use App\Support\SiteContent;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Seeds site_contents with what the site shows today (lang/config files), so the ERP editor starts from real copy.
// Not written: bn values identical to en (no Bangla yet: the bn file stays in charge and picks up future translations)
// and .env-backed fields (stored as null, so the server's .env stays effective until someone edits them in the ERP).
Artisan::command('site-content:export {--force : Overwrite rows that already exist}', function () {
    if ($this->option('force') && app()->isProduction() && ! $this->confirm('Overwrite ERP edits with the file values?')) {
        return;
    }
    $counts = ['created' => 0, 'updated' => 0, 'skipped' => 0, 'untranslated' => 0, 'server setting' => 0];
    $defaults = ['en' => SiteContent::defaults('en'), 'bn' => SiteContent::defaults('bn')];

    foreach (SiteContent::schema() as $key => $def) {
        $env = SiteContent::envFields($key);
        if ($env !== [] && count($env) === count($def['value']['fields'])) {
            $counts['server setting']++;

            continue;
        }
        foreach ($def['translatable'] ? ['en', 'bn'] : ['en'] as $locale) {
            if ($locale === 'bn' && $defaults['bn'][$key] === $defaults['en'][$key]) {
                $counts['untranslated']++;

                continue;
            }
            $where = ['site' => SiteContent::SITE, 'key' => $key, 'locale' => $locale];
            $exists = DB::table('site_contents')->where($where)->exists();
            if ($exists && ! $this->option('force')) {
                $counts['skipped']++;

                continue;
            }
            $value = array_replace($defaults[$locale][$key], array_fill_keys($env, null));
            DB::table('site_contents')->updateOrInsert($where, [
                'value' => json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                'updated_by' => 'site-content:export', 'updated_at' => now(),
                ...($exists ? [] : ['created_at' => now()]),
            ]);
            $counts[$exists ? 'updated' : 'created']++;
        }
    }

    $this->info(sprintf('site_contents (%s): %d created, %d updated, %d skipped, %d untranslated bn (not written), %d left to the server setting.',
        SiteContent::SITE, ...array_values($counts)));
})->purpose('Write the current file defaults into site_contents (missing rows only unless --force)');

// One-off cleanup of rows an earlier export wrote: bn rows that are just the en value, or (--env-keys) rows that pinned .env values.
Artisan::command('site-content:prune-untranslated {--dry-run : List the rows, delete nothing} {--env-keys : Instead, delete export-written rows of keys with .env-backed fields}', function () {
    $q = DB::table('site_contents')->where('site', SiteContent::SITE);
    if ($this->option('env-keys')) {
        $keys = array_values(array_filter(array_keys(SiteContent::schema()), fn ($k) => SiteContent::envFields($k) !== []));
        $rows = $q->whereIn('key', $keys)->where('updated_by', 'site-content:export')->orderBy('key')->get();
    } else {
        $en = (clone $q)->where('locale', 'en')->pluck('value', 'key');
        $rows = $q->where('locale', 'bn')->orderBy('key')->get()
            ->filter(fn ($r) => isset($en[$r->key]) && json_decode($r->value, true) === json_decode($en[$r->key], true));
    }

    foreach ($rows as $r) {
        $this->line("{$r->key} ({$r->locale})");
    }
    if ($this->option('dry-run')) {
        $this->info("{$rows->count()} rows would be deleted (dry run).");

        return;
    }
    DB::table('site_contents')->whereIn('id', $rows->pluck('id'))->delete();
    $this->info("{$rows->count()} rows deleted.");
})->purpose('Delete bn rows equal to their en row (or, with --env-keys, export rows that pin .env settings)');
