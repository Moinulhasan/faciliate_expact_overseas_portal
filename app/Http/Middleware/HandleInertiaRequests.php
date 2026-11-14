<?php

namespace App\Http\Middleware;

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
            'translations' => fn () => array_replace_recursive(self::load('en'), $locale === 'en' ? [] : self::load($locale)),
            'site' => config('site'),
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

    private static function load(string $locale): array
    {
        return collect(glob(lang_path("{$locale}/*.php")))
            ->mapWithKeys(fn ($f) => [basename($f, '.php') => require $f])
            ->all();
    }
}
