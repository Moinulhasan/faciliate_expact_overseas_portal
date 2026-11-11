<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use Database\Seeders\CountrySeeder;
use Inertia\Inertia;
use Inertia\Response;

// Content hubs. Copy lives in lang/en/hubs.php; lists come from the DB so they never drift from the detail pages.
class PageController extends Controller
{
    public function workAbroad(): Response
    {
        return Inertia::render('WorkAbroad', [
            'documents' => CountrySeeder::BASE_DOCS,
            'countries' => Country::active()->orderBy('sort')->get()->map->toCard(),
        ]);
    }

    public function employers(): Response
    {
        return Inertia::render('Employers', [
            'industries' => Industry::orderBy('sort')->get()->map->toCard(),
            'countries' => Country::active()->orderBy('sort')->get()->map->toCard(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'countryCount' => Country::active()->count(),
            'industryCount' => Industry::count(),
        ]);
    }
}
