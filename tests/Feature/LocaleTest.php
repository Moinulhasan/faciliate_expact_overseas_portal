<?php

namespace Tests\Feature;

use App\Http\Middleware\SetLocale;
use App\Models\JobOpening;
use Tests\TestCase;

class LocaleTest extends TestCase
{
    public function test_swap_maps_paths_between_locales(): void
    {
        $this->assertSame('/bn', SetLocale::swap('/', 'bn'));
        $this->assertSame('/bn/industries/mep', SetLocale::swap('/industries/mep', 'bn'));
        $this->assertSame('/industries/mep', SetLocale::swap('/bn/industries/mep', 'en'));
        $this->assertSame('/', SetLocale::swap('/bn', 'en'));
        $this->assertSame('/bn/jobs', SetLocale::swap('/bn/jobs', 'bn'));
        // a path that merely starts with "bn" letters is not the Bangla prefix
        $this->assertSame('/bn/bnx', SetLocale::swap('/bnx', 'bn'));
    }

    public function test_bdt_conversion_uses_config_rate_and_rounds_to_500(): void
    {
        config(['site.fx.bdt_per.SAR' => 32.5, 'site.fx.as_of' => '2026-11']);
        $job = new JobOpening(['salary_min' => 1800, 'salary_max' => 2600, 'currency' => 'SAR']);

        $this->assertSame(['salary_bdt_min' => 58500, 'salary_bdt_max' => 84500, 'fx_as_of' => '2026-11'], $job->bdt());

        $unknown = new JobOpening(['salary_min' => 100, 'salary_max' => 200, 'currency' => 'XYZ']);
        $this->assertNull($unknown->bdt()['salary_bdt_max']);
    }
}
