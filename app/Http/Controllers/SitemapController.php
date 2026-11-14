<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SetLocale;
use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

// shortcut: hand-rolled sitemap for the pages that exist; switch to spatie/laravel-sitemap in phase 12 (CLAUDE.md §8.5).
// Every path is listed in English and Bangla, each with hreflang alternates (Google's sitemap i18n format).
class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $paths = collect([
            ['/', null],
            ['/industries', Industry::max('updated_at')],
            ['/countries', Country::max('updated_at')],
            ['/jobs', JobOpening::open()->max('updated_at')],
            ['/work-abroad', null],
            ['/employers', null],
            ['/about', null],
            ['/contact', null],
            ['/privacy', null],
        ])
            ->merge(Industry::orderBy('sort')->get()->map(fn ($i) => ["/industries/{$i->slug}", $i->updated_at]))
            ->merge(Country::active()->orderBy('sort')->get()->map(fn ($c) => ["/countries/{$c->slug}", $c->updated_at]));

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
        foreach ($paths as [$path, $lastmod]) {
            $alts = '';
            foreach (SetLocale::LOCALES as $l) {
                $alts .= '<xhtml:link rel="alternate" hreflang="'.$l.'" href="'.e(url(SetLocale::swap($path, $l))).'"/>';
            }
            foreach (SetLocale::LOCALES as $l) {
                $xml .= '<url><loc>'.e(url(SetLocale::swap($path, $l))).'</loc>'
                    .($lastmod ? '<lastmod>'.Carbon::parse($lastmod)->toDateString().'</lastmod>' : '')
                    .$alts.'</url>';
            }
        }

        return response($xml.'</urlset>', 200, ['Content-Type' => 'application/xml']);
    }
}
