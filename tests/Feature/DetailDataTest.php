<?php

namespace Tests\Feature;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Detail pages: Bangla falls back cleanly, and pay is only ever derived from real open jobs.
class DetailDataTest extends TestCase
{
    use RefreshDatabase;

    private function country(array $extra = []): Country
    {
        return Country::create([
            'slug' => 'qatar', 'name_en' => 'Qatar', 'iso2' => 'QA', 'region' => 'gcc', 'lat' => 25, 'lng' => 51,
            'intro_en' => 'English intro', ...$extra,
        ]);
    }

    public function test_tr_prefers_i18n_then_legacy_column_then_english(): void
    {
        $c = $this->country(['i18n' => ['bn' => ['intro' => 'বাংলা']], 'name_bn' => 'কাতার']);

        app()->setLocale('bn');
        $this->assertSame('বাংলা', $c->tr('intro'));       // i18n json
        $this->assertSame('কাতার', $c->tr('name'));        // legacy {field}_bn column
        $this->assertNull($c->tr('missing'));               // nothing anywhere

        app()->setLocale('en');
        $this->assertSame('English intro', $c->tr('intro'));
    }

    public function test_pay_ranges_use_open_real_jobs_and_skip_mixed_currencies(): void
    {
        config(['site.show_samples' => false, 'site.fx.bdt_per' => ['QAR' => 30]]);
        $c = $this->country();
        foreach ([1 => 'welding', 2 => 'cooks'] as $id => $slug) {
            Industry::create(['id' => $id, 'slug' => $slug, 'name_en' => $slug, 'group' => 'construction']);
        }
        $base = ['country_id' => $c->id, 'title_en' => 'Welder', 'contract_months' => 24, 'currency' => 'QAR'];
        JobOpening::create([...$base, 'slug' => 'a', 'industry_id' => 1, 'salary_min' => 1200, 'salary_max' => 1500]);
        JobOpening::create([...$base, 'slug' => 'b', 'industry_id' => 1, 'salary_min' => 1000, 'salary_max' => 1800]);
        JobOpening::create([...$base, 'slug' => 'sample', 'industry_id' => 1, 'salary_min' => 9000, 'salary_max' => 9999, 'is_sample' => true]);
        JobOpening::create([...$base, 'slug' => 'c', 'industry_id' => 2, 'salary_min' => 1000, 'salary_max' => 1100]);
        JobOpening::create([...$base, 'slug' => 'd', 'industry_id' => 2, 'salary_min' => 400, 'salary_max' => 500, 'currency' => 'USD']);

        $pay = JobOpening::payRanges(JobOpening::query()->whereBelongsTo($c), 'industry_id');

        $this->assertSame(['currency' => 'QAR', 'min' => 1000, 'max' => 1800, 'count' => 2, 'bdt_min' => 30000, 'bdt_max' => 54000], $pay[1]);
        $this->assertArrayNotHasKey(2, $pay->all()); // mixed QAR/USD → no range rather than a wrong one
    }
}
