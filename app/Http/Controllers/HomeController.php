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
            'testimonials' => Testimonial::with('country')->visible()->orderBy('sort')->limit(5)->get()->map->toCard(),
        ]);
    }
}
