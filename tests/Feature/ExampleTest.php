<?php

namespace Tests\Feature;

use Database\Seeders\CountrySeeder;
use Database\Seeders\IndustrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Smoke test: key pages render in English and Bangla with the right language and hreflang alternates.
class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed([IndustrySeeder::class, CountrySeeder::class]);
    }

    public function test_home_renders_in_english_and_bangla(): void
    {
        $this->get('/')->assertOk()->assertSee('<html lang="en">', false);

        $bn = $this->get('/bn')->assertOk()->assertSee('<html lang="bn">', false);
        $page = json_decode(html_entity_decode($bn->viewData('page') ? json_encode($bn->viewData('page')) : '{}'), true);
        $this->assertSame('bn', $page['props']['locale']);
        $this->assertSame('বিদেশে চাকরি খুঁজুন', $page['props']['translations']['home']['hero']['cta_candidate']);
        // untranslated keys fall back to English
        $this->assertSame('Two ways in.', $page['props']['translations']['home']['fork']['title']);
        $this->assertStringEndsWith('/bn', $page['props']['alternates']['bn']);
    }

    public function test_every_main_page_renders_in_both_languages(): void
    {
        foreach (['/industries', '/industries/construction', '/countries', '/countries/japan', '/jobs', '/about', '/contact', '/privacy', '/work-abroad', '/employers'] as $path) {
            $this->get($path)->assertOk();
            $this->get("/bn{$path}")->assertOk();
        }
    }

    public function test_sitemap_lists_both_languages(): void
    {
        $this->get('/sitemap.xml')->assertOk()->assertSee('hreflang="bn"', false)->assertSee('/bn/countries/japan', false);
    }
}
