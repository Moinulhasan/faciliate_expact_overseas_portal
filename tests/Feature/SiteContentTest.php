<?php

namespace Tests\Feature;

use App\Http\Middleware\HandleInertiaRequests;
use App\Support\SiteContent;
use Database\Seeders\CountrySeeder;
use Database\Seeders\IndustrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

// Editable content: valid DB rows override the lang/config files; an empty, missing or broken table changes nothing.
class SiteContentTest extends TestCase
{
    use RefreshDatabase;

    private const PAGES = ['/', '/industries', '/countries', '/jobs', '/about', '/contact', '/privacy', '/work-abroad', '/employers'];

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed([IndustrySeeder::class, CountrySeeder::class]);
    }

    private function props(TestResponse $res): array
    {
        return $res->assertOk()->viewData('page')['props'];
    }

    private function row(string $key, string $locale, mixed $value, string $at = '2026-11-17 10:00:00'): void
    {
        DB::table('site_contents')->updateOrInsert(
            ['site' => 'overseas', 'key' => $key, 'locale' => $locale],
            ['value' => json_encode($value), 'created_at' => $at, 'updated_at' => $at],
        );
    }

    /** A complete row, as the ERP saves it: the current default with some fields changed. */
    private function edited(string $key, string $locale, array $changes, string $at = '2026-11-17 10:00:00'): void
    {
        $this->row($key, $locale, array_replace(SiteContent::defaults($locale)[$key], $changes), $at);
    }

    private function assertUnchanged(): void
    {
        foreach (self::PAGES as $path) {
            foreach (['en' => $path, 'bn' => rtrim("/bn{$path}", '/')] as $locale => $url) {
                $p = $this->props($this->get($url));
                $this->assertSame(HandleInertiaRequests::translations($locale), $p['translations'], $url);
                $this->assertSame(config('site'), $p['site'], $url);
            }
        }
        $this->assertSame(CountrySeeder::BASE_DOCS, $this->props($this->get('/work-abroad'))['documents']);
    }

    public function test_empty_table_renders_the_file_values(): void
    {
        $this->assertUnchanged();
    }

    public function test_missing_table_renders_the_file_values_without_error(): void
    {
        Schema::drop('site_contents');

        $this->assertUnchanged();
    }

    public function test_a_db_failure_is_tried_once_per_request(): void
    {
        Schema::drop('site_contents');
        $attempts = 0;
        DB::connection()->beforeExecuting(function (string $sql) use (&$attempts) {
            $attempts += str_contains($sql, 'site_contents') ? 1 : 0;
        });

        $this->get('/bn')->assertOk(); // bn and en lookups, shared + page keys

        $this->assertSame(1, $attempts);
    }

    public function test_rows_override_in_english_and_bangla(): void
    {
        $this->edited('home.hero', 'en', ['title_a' => 'New EN headline']);
        $this->edited('home.hero', 'bn', ['title_a' => 'নতুন শিরোনাম']);
        $this->edited('home.faq', 'en', ['items' => [['q' => 'Q1?', 'a' => 'A1.']]]);
        $this->edited('site.contact', 'en', ['phone' => '+880 1 000', 'hours' => null]);
        $this->row('documents.base', 'en', ['Only a passport']);

        $en = $this->props($this->get('/'));
        $this->assertSame('New EN headline', $en['translations']['home']['hero']['title_a']);
        $this->assertSame(__('home.hero.title_b', [], 'en'), $en['translations']['home']['hero']['title_b']);
        $this->assertSame(__('home.hero.cta_candidate', [], 'en'), $en['translations']['home']['hero']['cta_candidate']); // UI labels untouched
        $this->assertSame([['q' => 'Q1?', 'a' => 'A1.']], $en['translations']['home']['faq']['items']);
        $this->assertSame('+880 1 000', $en['site']['contact']['phone']);
        $this->assertSame(config('site.contact.email'), $en['site']['contact']['email']);

        $bn = $this->props($this->get('/bn'));
        $this->assertSame('নতুন শিরোনাম', $bn['translations']['home']['hero']['title_a']);
        $this->assertSame('+880 1 000', $bn['site']['contact']['phone']); // not translatable: the en row serves both

        $this->assertSame(['Only a passport'], $this->props($this->get('/work-abroad'))['documents']);
        $this->get('/')->assertSee('New EN headline'); // reaches the rendered HTML
    }

    public function test_bangla_falls_back_to_the_english_row(): void
    {
        $this->edited('home.final', 'en', ['lead' => 'English-only lead']);

        $this->assertSame('English-only lead', $this->props($this->get('/bn'))['translations']['home']['final']['lead']);
    }

    public function test_partial_row_falls_back_to_the_default(): void
    {
        $this->row('home.hero', 'en', ['title_a' => 'Only one field']);   // required fields missing
        $this->row('home.faq', 'en', ['title' => 'T', 'lead' => 'L', 'items' => [['q' => 'No answer']]]); // item missing "a"

        $p = $this->props($this->get('/'));
        $this->assertSame(__('home.hero', [], 'en'), $p['translations']['home']['hero']);
        $this->assertSame(__('home.faq', [], 'en'), $p['translations']['home']['faq']);
    }

    public function test_wrong_type_row_falls_back_to_the_default(): void
    {
        $this->row('home.footer', 'en', 'just a string');
        $this->edited('site.stats', 'en', ['workers_deployed' => 'lots']);
        $this->edited('home.costs', 'en', ['pay' => 'not a list']);
        $this->row('documents.base', 'en', [['nested' => 'object']]);
        $this->row('home.journey', 'bn', ['oops']); // broken bn row → valid en row would be next; none → file

        $this->assertUnchanged();
    }

    public function test_cache_rebuilds_when_a_row_is_updated(): void
    {
        $this->edited('home.footer', 'en', ['tagline' => 'First']);
        $this->assertSame('First', $this->props($this->get('/'))['translations']['home']['footer']['tagline']);

        $this->edited('home.footer', 'en', ['tagline' => 'Second'], '2026-11-17 11:00:00');
        $this->assertSame('Second', $this->props($this->get('/'))['translations']['home']['footer']['tagline']);
    }

    public function test_export_is_idempotent_and_force_overwrites(): void
    {
        $translatable = collect(SiteContent::schema())->where('translatable', true)->count();
        $total = $translatable * 2 + (count(SiteContent::schema()) - $translatable);
        $footer = fn () => json_decode(DB::table('site_contents')->where('key', 'home.footer')->where('locale', 'en')->value('value'), true);

        $this->artisan('site-content:export')->expectsOutputToContain("{$total} created, 0 updated, 0 skipped")->assertOk();
        $this->assertSame($total, DB::table('site_contents')->count());
        $this->assertUnchanged(); // exported rows are valid and render exactly like the files

        $this->edited('home.footer', 'en', ['tagline' => 'Edited'], '2026-11-17 12:00:00');
        $this->artisan('site-content:export')->expectsOutputToContain("0 created, 0 updated, {$total} skipped")->assertOk();
        $this->assertSame(['tagline' => 'Edited'], $footer());

        $this->artisan('site-content:export', ['--force' => true])->expectsOutputToContain("0 created, {$total} updated, 0 skipped")->assertOk();
        $this->assertSame(['tagline' => __('home.footer.tagline', [], 'en')], $footer());
        $this->assertSame($total, DB::table('site_contents')->count());
    }

    public function test_schema_covers_every_key_the_code_reads(): void
    {
        $schema = SiteContent::schema();
        foreach (array_keys(SiteContent::SOURCES) as $key) {
            $this->assertArrayHasKey($key, $schema, "SiteContent::SOURCES has '{$key}', which is missing from ".SiteContent::SCHEMA);
        }
        $this->assertSame([], array_values(array_diff(array_keys($schema), array_keys(SiteContent::SOURCES))), 'schema keys without a source');

        foreach ([...File::allFiles(app_path()), ...File::allFiles(base_path('routes'))] as $file) {
            preg_match_all("/SiteContent::get\\(\\s*'([^']+)'/", file_get_contents($file), $m);
            foreach ($m[1] as $key) {
                $this->assertArrayHasKey($key, $schema, "{$file} reads '{$key}', which is missing from ".SiteContent::SCHEMA);
            }
        }
    }

    public function test_every_default_is_valid_against_the_schema(): void
    {
        $this->assertSame(['site', 'version', 'keys'], array_keys(json_decode(file_get_contents(base_path(SiteContent::SCHEMA)), true)));
        foreach (['en', 'bn'] as $locale) {
            foreach (SiteContent::defaults($locale) as $key => $default) {
                $def = SiteContent::schema()[$key];
                $this->assertSame(['label', 'section', 'translatable', 'value'], array_keys($def), $key);
                // a field name typo would read null from the file and fail "required" here
                $this->assertSame($default, SiteContent::validate($def['value'], $default), "{$key} ({$locale}) default does not validate");
                $this->assertFits($def['value'], $default, "{$key} ({$locale})");
            }
        }
    }

    /** Field metadata is complete and every default fits the max lengths / item counts the ERP will enforce. */
    private function assertFits(array $field, mixed $value, string $where): void
    {
        $this->assertContains($field['type'], ['text', 'textarea', 'number', 'url', 'email', 'phone', 'image', 'list', 'items', 'group'], $where);
        $this->assertArrayHasKey('label', $field, $where);
        $this->assertIsBool($field['required'], $where);
        if ($value === null) {
            return;
        }
        match ($field['type']) {
            'group' => array_map(fn ($n) => $this->assertFits($field['fields'][$n], $value[$n], "{$where}.{$n}"), array_keys($field['fields'])),
            'items', 'list' => array_map(function ($item, $i) use ($field, $where) {
                $this->assertLessThanOrEqual($field['max_items'], $i + 1, "{$where} max_items");
                $field['type'] === 'items'
                    ? $this->assertFits(['type' => 'group', 'label' => '', 'required' => true, 'fields' => $field['fields']], $item, "{$where}[{$i}]")
                    : $this->assertLessThanOrEqual($field['max'], mb_strlen($item), "{$where}[{$i}] max");
            }, $value, array_keys($value)),
            'number' => $this->assertTrue($value >= ($field['min'] ?? PHP_INT_MIN) && $value <= ($field['max'] ?? PHP_INT_MAX), "{$where} range"),
            default => $this->assertLessThanOrEqual($field['max'], mb_strlen($value), "{$where} max"),
        };
    }
}
