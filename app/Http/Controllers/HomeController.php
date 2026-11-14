<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', [
            'countries' => Country::active()->orderBy('sort')->get()->map->toCard(),
            'industries' => Industry::orderBy('sort')->limit(8)->get()->map->toCard(),
            'industryCount' => Industry::count(),
            'jobs' => JobOpening::with(['country', 'industry'])->open()->latest()->limit(6)->get()->map->toDetail(),
            // Quick filters for the home list → /jobs?country=… (counts across all open jobs, not just the 6 shown).
            'jobCountries' => JobOpening::open()->with('country')->get()->groupBy('country_id')
                ->map(fn ($g) => ['slug' => $g->first()->country->slug, 'name' => $g->first()->country->name, 'iso2' => $g->first()->country->iso2, 'count' => $g->count()])
                ->sortByDesc('count')->values(),
            'testimonials' => Testimonial::with('country')->visible()->orderBy('sort')->limit(5)->get()->map->toCard(),
            'formOptions' => InquiryController::formOptions(),
        ]);
    }
}
