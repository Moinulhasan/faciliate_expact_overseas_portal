<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// /bn/... → Bangla, everything else → English (CLAUDE.md §3 "Bangla mirror of every route").
// Runs before HandleInertiaRequests so shared translations are already in the right language.
class SetLocale
{
    public const LOCALES = ['en', 'bn'];

    public function handle(Request $request, Closure $next): Response
    {
        app()->setLocale($request->segment(1) === 'bn' ? 'bn' : 'en');

        return $next($request);
    }

    /** Same page in the other locale: /industries ↔ /bn/industries. */
    public static function swap(string $path, string $to): string
    {
        $bare = preg_replace('#^/?bn(?=/|$)#', '', '/'.ltrim($path, '/')) ?: '/';

        return $to === 'bn' ? rtrim('/bn'.$bare, '/') : $bare;
    }
}
