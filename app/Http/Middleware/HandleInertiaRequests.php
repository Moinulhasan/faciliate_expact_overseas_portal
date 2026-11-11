<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            ...parent::share($request),
            'locale' => $locale,
            // shortcut: shares every lang file; fine while there are only a few, split per page when they grow.
            'translations' => fn () => collect(glob(lang_path("{$locale}/*.php")))
                ->mapWithKeys(fn ($f) => [basename($f, '.php') => require $f])
                ->all(),
            'site' => config('site'),
            'flash' => fn () => ['inquiry_sent' => (bool) $request->session()->get('inquiry_sent')],
            // Canonical = current path without query string (filters/tracking params never create duplicates).
            'canonical' => fn () => url($request->path()),
            'appUrl' => rtrim(config('app.url'), '/'),
        ];
    }
}
