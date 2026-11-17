<?php

namespace App\Http\Middleware;

use App\Support\SiteContent;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        $locale = app()->getLocale(); // set by SetLocale, which runs first
        $path = '/'.ltrim($request->path(), '/');

        return [
            ...parent::share($request),
            'locale' => $locale,
            // English is the base; Bangla files override key by key, so untranslated strings fall back to English.
            // shortcut: shares every lang file; fine while there are only a few, split per page when they grow.
            // Editable copy (site_contents, written by the ERP) overrides the file values key by key — see SiteContent.
            'translations' => fn () => SiteContent::apply('lang', self::translations($locale)),
            'site' => fn () => SiteContent::apply('config', ['site' => config('site')])['site'],
            'flash' => fn () => ['inquiry_sent' => (bool) $request->session()->get('inquiry_sent')],
            // Canonical = current path without query string (filters/tracking params never create duplicates).
            'canonical' => fn () => url($request->path()),
            // hreflang alternates for the same page in each locale.
            'alternates' => fn () => [
                'en' => url(SetLocale::swap($path, 'en')),
                'bn' => url(SetLocale::swap($path, 'bn')),
            ],
            'appUrl' => rtrim(config('app.url'), '/'),
        ];
    }

    /** Lang files for $locale over English: the file defaults, before site_contents. */
    public static function translations(string $locale): array
    {
        return array_replace_recursive(self::load('en'), $locale === 'en' ? [] : self::load($locale));
    }

    private static function load(string $locale): array
    {
        return collect(glob(lang_path("{$locale}/*.php")))
            ->mapWithKeys(fn ($f) => [basename($f, '.php') => require $f])
            ->all();
    }
}
