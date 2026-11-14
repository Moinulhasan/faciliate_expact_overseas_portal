<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Inertia\Inertia;
use Inertia\Response;

class IndustryController extends Controller
{
    public function index(): Response
    {
        $countries = Country::active()->orderBy('sort')->get();

        return Inertia::render('Industries/Index', [
            'industries' => Industry::orderBy('sort')->get()->map(fn (Industry $i) => [
                ...$i->toCard(),
                'countries' => $countries
                    ->filter(fn ($c) => collect($c->sectors ?? [])->contains('industry', $i->slug))
                    ->map(fn ($c) => ['name' => $c->name, 'iso2' => $c->iso2])
                    ->values(),
            ]),
        ]);
    }

    public function show(Industry $industry): Response
    {
        // Current pay per country for this trade, from real open jobs only.
        $pay = JobOpening::payRanges(JobOpening::query()->where('industry_id', $industry->id), 'country_id');

        return Inertia::render('Industries/Show', [
            'industry' => $industry->toDetail(),
            'countries' => $industry->hiringCountries()->map(fn (Country $c) => [
                ...$c->toCard(),
                'note' => $c->sectorNote($industry->slug),
                'pay' => $pay[$c->id] ?? null,
            ]),
            'jobs' => JobOpening::with(['country', 'industry'])->open()->where('industry_id', $industry->id)->latest()->limit(6)->get()->map->toDetail(),
            'related' => Industry::where('group', $industry->group)->whereKeyNot($industry->id)->orderBy('sort')->limit(3)->get()->map->toCard(),
        ]);
    }
}
