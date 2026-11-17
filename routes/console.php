<?php

use App\Support\SiteContent;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Seeds site_contents with what the site shows today (lang/config files), so the ERP editor starts from real copy.
Artisan::command('site-content:export {--force : Overwrite rows that already exist}', function () {
    $counts = ['created' => 0, 'updated' => 0, 'skipped' => 0];
    $defaults = ['en' => SiteContent::defaults('en'), 'bn' => SiteContent::defaults('bn')];

    foreach (SiteContent::schema() as $key => $def) {
        foreach ($def['translatable'] ? ['en', 'bn'] : ['en'] as $locale) {
            $where = ['site' => SiteContent::SITE, 'key' => $key, 'locale' => $locale];
            $exists = DB::table('site_contents')->where($where)->exists();
            if ($exists && ! $this->option('force')) {
                $counts['skipped']++;

                continue;
            }
            $value = json_encode($defaults[$locale][$key], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            DB::table('site_contents')->updateOrInsert($where, [
                'value' => $value, 'updated_by' => 'site-content:export', 'updated_at' => now(),
                ...($exists ? [] : ['created_at' => now()]),
            ]);
            $counts[$exists ? 'updated' : 'created']++;
        }
    }

    $this->info(sprintf('site_contents (%s): %d created, %d updated, %d skipped.', SiteContent::SITE, ...array_values($counts)));
})->purpose('Write the current file defaults into site_contents (missing rows only unless --force)');
