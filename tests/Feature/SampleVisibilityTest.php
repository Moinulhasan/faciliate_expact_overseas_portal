<?php

namespace Tests\Feature;

use App\Models\Country;
use App\Models\JobOpening;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Sample jobs/reviews must never reach the live site (UX audit saw "Sample" badges in public).
class SampleVisibilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $c = Country::create(['slug' => 'qatar', 'name_en' => 'Qatar', 'iso2' => 'QA', 'region' => 'gcc', 'lat' => 25, 'lng' => 51]);
        $base = ['country_id' => $c->id, 'title_en' => 'Welder', 'salary_min' => 1, 'salary_max' => 2, 'currency' => 'QAR', 'contract_months' => 24];
        JobOpening::create([...$base, 'slug' => 'real', 'is_sample' => false]);
        JobOpening::create([...$base, 'slug' => 'sample', 'is_sample' => true]);
        Testimonial::create(['type' => 'worker', 'name' => 'Real', 'role_en' => 'Welder', 'quote_en' => 'Good.', 'is_published' => true, 'consent_at' => now()]);
        Testimonial::create(['type' => 'worker', 'name' => 'Sample', 'role_en' => 'Welder', 'quote_en' => 'Good.', 'is_published' => true, 'is_sample' => true]);
    }

    public function test_samples_are_hidden_by_default(): void
    {
        config(['site.show_samples' => false]);

        $this->assertSame(['real'], JobOpening::open()->pluck('slug')->all());
        $this->assertSame(['Real'], Testimonial::visible()->pluck('name')->all());
    }

    public function test_samples_show_only_with_explicit_opt_in(): void
    {
        config(['site.show_samples' => true]);

        $this->assertEqualsCanonicalizing(['real', 'sample'], JobOpening::open()->pluck('slug')->all());
        $this->assertEqualsCanonicalizing(['Real', 'Sample'], Testimonial::visible()->pluck('name')->all());
    }

    public function test_production_never_shows_samples_even_with_opt_in(): void
    {
        config(['site.show_samples' => true]);
        $this->app['env'] = 'production';

        $this->assertSame(['real'], JobOpening::open()->pluck('slug')->all());
        $this->assertSame(['Real'], Testimonial::visible()->pluck('name')->all());
    }
}
