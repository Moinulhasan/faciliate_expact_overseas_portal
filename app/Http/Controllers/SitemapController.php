<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Illuminate\Http\Response;

// shortcut: hand-rolled sitemap for the pages that exist; switch to spatie/laravel-sitemap in phase 12 (CLAUDE.md §8.5).
class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = collect([
            ['loc' => url('/'), 'lastmod' => null],
            ['loc' => url('/industries'), 'lastmod' => Industry::max('updated_at')],
            ['loc' => url('/countries'), 'lastmod' => Country::max('updated_at')],
            ['loc' => url('/jobs'), 'lastmod' => JobOpening::open()->max('updated_at')],
            ['loc' => url('/work-abroad'), 'lastmod' => null],
            ['loc' => url('/employers'), 'lastmod' => null],
            ['loc' => url('/about'), 'lastmod' => null],
            ['loc' => url('/contact'), 'lastmod' => null],
        ])
            ->merge(Industry::orderBy('sort')->get()->map(fn ($i) => ['loc' => url("/industries/{$i->slug}"), 'lastmod' => $i->updated_at]))
            ->merge(Country::active()->orderBy('sort')->get()->map(fn ($c) => ['loc' => url("/countries/{$c->slug}"), 'lastmod' => $c->updated_at]));

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach ($urls as $u) {
            $xml .= '<url><loc>'.e($u['loc']).'</loc>'.($u['lastmod'] ? '<lastmod>'.\Illuminate\Support\Carbon::parse($u['lastmod'])->toDateString().'</lastmod>' : '').'</url>';
        }

        return response($xml.'</urlset>', 200, ['Content-Type' => 'application/xml']);
    }
}
