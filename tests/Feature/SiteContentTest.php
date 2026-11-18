<?php

namespace Tests\Feature;

use App\Http\Middleware\HandleInertiaRequests;
use App\Support\SiteContent;
use Database\Seeders\CountrySeeder;
use Database\Seeders\IndustrySeeder;
use App\Mail\InquiryReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

// Editable content: valid DB rows override the lang/config files; an empty, missing or broken table changes nothing.
class SiteContentTest extends TestCase
{
    use RefreshDatabase;

    private const INQUIRY = ['type' => 'employer', 'name' => 'Test Person', 'phone' => '+880 1711 000000', 'email' => 'person@example.com',
        'company' => 'Example Co', 'message' => 'We need 20 welders for Qatar next month.', 'page' => '/contact', 'consent' => '1'];

    private const PAGES =['/', '/industries', '/countries', '/jobs', '/about', '/contact', '/privacy', '/work-abroad', '/employers'];

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

    public function test_a_missing_bn_row_shows_the_bangla_file_text_not_the_english_row(): void
    {
        $this->edited('home.hero', 'en', ['title_a' => 'English-only headline']); // bn row deleted / never saved

        $this->assertSame(__('home.hero.title_a', [], 'bn'), $this->props($this->get('/bn'))['translations']['home']['hero']['title_a']);
        $this->assertSame('English-only headline', $this->props($this->get('/'))['translations']['home']['hero']['title_a']);
    }

    public function test_an_invalid_bn_row_shows_the_bangla_file_text_not_the_english_row(): void
    {
        $this->edited('home.hero', 'en', ['title_a' => 'English-only headline']);
        $this->row('home.hero', 'bn', ['title_a' => 'অসম্পূর্ণ']); // required fields missing

        $this->assertSame(__('home.hero', [], 'bn'), $this->props($this->get('/bn'))['translations']['home']['hero']);
    }

    public function test_an_update_shows_on_the_next_request_even_with_the_same_updated_at(): void
    {
        $this->edited('home.footer', 'en', ['tagline' => 'First']);
        $this->assertSame('First', $this->props($this->get('/'))['translations']['home']['footer']['tagline']);

        $this->edited('home.footer', 'en', ['tagline' => 'Second']); // same second, same row count
        $this->assertSame('Second', $this->props($this->get('/'))['translations']['home']['footer']['tagline']);
    }

    public function test_one_site_contents_query_per_request(): void
    {
        $this->edited('home.hero', 'bn', ['title_a' => 'নতুন']);
        $queries = 0;
        DB::connection()->beforeExecuting(function (string $sql) use (&$queries) {
            $queries += str_contains($sql, 'site_contents') ? 1 : 0;
        });

        $this->get('/bn')->assertOk(); // bn keys + en-only keys

        $this->assertSame(1, $queries);
    }

    public function test_url_phone_email_shape_and_lengths_are_enforced(): void
    {
        $this->edited('site.company', 'en', ['main_site' => 'javascript:alert(1)']);
        $this->edited('site.contact', 'en', ['email' => 'not-an-email']);
        $this->edited('home.hero', 'en', ['title_a' => str_repeat('x', 1000)]);                    // over max
        $this->edited('home.faq', 'en', ['items' => array_fill(0, 200, ['q' => 'Q?', 'a' => 'A.'])]); // over max_items
        $this->edited('site.stats', 'en', ['years_licensed' => -5]);                                 // below min

        $this->assertUnchanged();

        $this->edited('site.contact', 'en', ['phone' => 'call me']);
        $this->assertSame(config('site.contact.phone'), $this->props($this->get('/'))['site']['contact']['phone']);
    }

    public function test_env_backed_fields_use_the_row_then_the_server_setting(): void
    {
        config(['site.contact.whatsapp' => '8800000000001', 'site.licence.rl_number' => 'RL-ENV']);
        $site = fn () => $this->props($this->get('/'))['site'];

        $this->assertSame('8800000000001', $site()['contact']['whatsapp']);                // no row → .env

        $this->edited('site.contact', 'en', ['whatsapp' => null, 'phone' => '+880 1 000']);
        $this->edited('site.licence', 'en', ['rl_number' => null, 'bmet' => 'BMET-1']);
        $this->assertSame('8800000000001', $site()['contact']['whatsapp']);                // blank in row → .env
        $this->assertSame('+880 1 000', $site()['contact']['phone']);
        $this->assertSame(['rl_number' => 'RL-ENV', 'bmet' => 'BMET-1', 'baira' => null], $site()['licence']);

        $this->edited('site.contact', 'en', ['whatsapp' => '8800000000002']);
        $this->assertSame('8800000000002', $site()['contact']['whatsapp']);                // row wins
    }

    public function test_the_inquiry_recipient_is_not_editable(): void
    {
        $this->assertArrayNotHasKey('inquiry_email', SiteContent::schema()['site.contact']['value']['fields']);
        $this->row('site.contact', 'en', [...SiteContent::defaults('en')['site.contact'], 'inquiry_email' => 'evil@example.com']);
        Mail::fake();

        $this->assertSame(config('site.contact.inquiry_email'), $this->props($this->get('/'))['site']['contact']['inquiry_email']);
        $this->post('/inquiries', self::INQUIRY)->assertSessionHas('inquiry_sent', true);
        Mail::assertSent(InquiryReceived::class, fn ($m) => $m->hasTo(config('site.contact.inquiry_email')) && ! $m->hasTo('evil@example.com'));
    }

    public function test_down_refuses_while_the_table_has_rows_and_drops_it_when_empty(): void
    {
        $migration = require database_path('migrations/2026_11_17_090000_create_site_contents_table.php');
        DB::table('site_contents')->insert(['site' => 'main', 'key' => 'k', 'locale' => 'en', 'value' => '"x"']);

        try {
            $migration->down();
            $this->fail('down() dropped a table with content');
        } catch (\RuntimeException $e) {
            $this->assertSame('site_contents has content rows; export or delete them first', $e->getMessage());
        }
        $this->assertSame(1, DB::table('site_contents')->count());

        DB::table('site_contents')->delete();
        $migration->down();
        $this->assertFalse(Schema::hasTable('site_contents'));
    }

    public function test_prune_untranslated_deletes_only_bn_rows_equal_to_en(): void
    {
        $d = ['en' => SiteContent::defaults('en'), 'bn' => SiteContent::defaults('bn')];
        $this->row('hubs.about', 'en', $d['en']['hubs.about']);
        $this->row('hubs.about', 'bn', $d['en']['hubs.about']);   // English in the bn row → pruned
        $this->row('home.hero', 'en', $d['en']['home.hero']);
        $this->row('home.hero', 'bn', $d['bn']['home.hero']);     // real Bangla → kept
        $this->row('home.fork', 'bn', $d['en']['home.fork']);     // no en row to compare → kept
        DB::table('site_contents')->insert(['site' => 'main', 'key' => 'hubs.about', 'locale' => 'bn', 'value' => json_encode($d['en']['hubs.about'])]);

        $this->artisan('site-content:prune-untranslated', ['--dry-run' => true])
            ->expectsOutput('hubs.about (bn)')->expectsOutputToContain('1 rows would be deleted')->assertOk();
        $this->assertSame(6, DB::table('site_contents')->count());

        $this->artisan('site-content:prune-untranslated')->expectsOutputToContain('1 rows deleted')->assertOk();
        $this->assertFalse(DB::table('site_contents')->where(['site' => 'overseas', 'key' => 'hubs.about', 'locale' => 'bn'])->exists());
        $this->assertSame(5, DB::table('site_contents')->count());
    }

    public function test_prune_env_keys_deletes_only_export_rows_of_env_backed_keys(): void
    {
        $row = fn ($site, $key, $by = 'site-content:export') => ['site' => $site, 'key' => $key, 'locale' => 'en', 'value' => '{}', 'updated_by' => $by];
        DB::table('site_contents')->insert([$row('overseas', 'site.licence'), $row('overseas', 'site.contact'), $row('overseas', 'site.stats'), $row('main', 'site.contact')]);

        $this->artisan('site-content:prune-untranslated', ['--env-keys' => true, '--dry-run' => true])
            ->expectsOutput('site.contact (en)')->expectsOutput('site.licence (en)')->expectsOutputToContain('2 rows would be deleted')->assertOk();
        $this->assertSame(4, DB::table('site_contents')->count());

        $this->artisan('site-content:prune-untranslated', ['--env-keys' => true])->expectsOutputToContain('2 rows deleted')->assertOk();
        $this->assertSame(['site.contact', 'site.stats'], DB::table('site_contents')->orderBy('key')->pluck('key')->all());

        DB::table('site_contents')->insert($row('overseas', 'site.licence', 'Owner')); // an ERP edit is kept
        $this->artisan('site-content:prune-untranslated', ['--env-keys' => true])->expectsOutputToContain('0 rows deleted')->assertOk();
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
        $this->row('home.journey', 'bn', ['oops']); // broken bn row → bn file

        $this->assertUnchanged();
    }

    public function test_export_is_idempotent_and_force_overwrites(): void
    {
        $en = SiteContent::defaults('en');
        $bn = SiteContent::defaults('bn');
        $translated = collect(SiteContent::schema())->filter(fn ($d, $k) => $d['translatable'] && $bn[$k] !== $en[$k])->count();
        $untranslated = collect(SiteContent::schema())->where('translatable', true)->count() - $translated;
        $total = count(SiteContent::schema()) - 1 + $translated; // every en row except site.licence (all .env) + real Bangla rows
        $footer = fn () => json_decode(DB::table('site_contents')->where('key', 'home.footer')->where('locale', 'en')->value('value'), true);

        $this->artisan('site-content:export')
            ->expectsOutputToContain("{$total} created, 0 updated, 0 skipped, {$untranslated} untranslated bn (not written), 1 left to the server setting")->assertOk();
        $this->assertSame($total, DB::table('site_contents')->count());
        $this->assertFalse(DB::table('site_contents')->where('key', 'hubs.about')->where('locale', 'bn')->exists()); // English in bn: not written
        $this->assertFalse(DB::table('site_contents')->where('key', 'site.licence')->exists());
        $contact = json_decode(DB::table('site_contents')->where('key', 'site.contact')->value('value'), true);
        $this->assertNull($contact['whatsapp']); // .env stays effective
        $this->assertArrayNotHasKey('inquiry_email', $contact);
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

    /** The ERP prefills its editor from this file; re-run `php artisan site-content:export --json` when this fails. */
    public function test_the_defaults_file_matches_the_readers_defaults(): void
    {
        $file = json_decode(file_get_contents(base_path(SiteContent::DEFAULTS_FILE)), true, flags: JSON_THROW_ON_ERROR);
        $this->assertSame(SiteContent::defaultsForEditor(), $file, SiteContent::DEFAULTS_FILE.' is stale');

        $en = SiteContent::defaults('en');
        $bn = SiteContent::defaults('bn');
        foreach (SiteContent::schema() as $key => $def) {
            $env = SiteContent::envFields($key);
            foreach ($def['value']['type'] === 'group' ? $def['value']['fields'] : [] as $f => $_) {
                $this->assertSame(in_array($f, $env, true) ? null : $en[$key][$f], $file[$key]['en'][$f], "{$key}.{$f} (en)");
            }
            if ($def['value']['type'] !== 'group') {
                $this->assertSame($en[$key], $file[$key]['en'], "{$key} (en)");
            }
            $translated = $def['translatable'] && $bn[$key] !== $en[$key];
            $this->assertSame($translated ? $bn[$key] : null, $file[$key]['bn'], "{$key} (bn)");
        }

        $this->artisan('site-content:export --json')->assertSuccessful();
        $this->assertSame($file, json_decode(file_get_contents(base_path(SiteContent::DEFAULTS_FILE)), true));
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
