<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
    public function index(): Response
    {
        $industries = Industry::all()->keyBy('slug');

        return Inertia::render('Countries/Index', [
            'countries' => Country::active()->orderBy('sort')->get()->map(fn (Country $c) => [
                ...$c->toCard(),
                // Search index: roles of every industry this country hires for ("caregiver" → Japan).
                'keywords' => collect($c->sectors ?? [])
                    ->flatMap(fn ($s) => $industries[$s['industry']]->roles ?? [])
                    ->unique()->implode(' '),
            ]),
        ]);
    }

    public function show(Country $country): Response
    {
        abort_unless($country->is_active, 404);
        $industries = Industry::all()->keyBy('slug');

        return Inertia::render('Countries/Show', [
            'country' => $country->toDetail($industries),
            'jobs' => JobOpening::with(['country', 'industry'])->open()->whereBelongsTo($country)->latest()->limit(6)->get()->map->toDetail(),
            'related' => Country::active()->where('region', $country->region)->whereKeyNot($country->id)
                ->orderBy('sort')->limit(4)->get()->map->toCard(),
        ]);
    }
}
