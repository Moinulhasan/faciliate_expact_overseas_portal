<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(Request $request): Response
    {
        $f = $request->validate([
            'q' => ['nullable', 'string', 'max:80'],
            'country' => ['nullable', 'string', 'max:60'],
            'industry' => ['nullable', 'string', 'max:60'],
            'gender' => ['nullable', 'in:any,male,female'],
            'sort' => ['nullable', 'in:newest,deadline,salary'],
        ]);

        $base = JobOpening::open();
        $jobs = (clone $base)->with(['country', 'industry'])
            ->when($f['country'] ?? null, fn ($q, $s) => $q->whereHas('country', fn ($c) => $c->where('slug', $s)))
            ->when($f['industry'] ?? null, fn ($q, $s) => $q->whereHas('industry', fn ($i) => $i->where('slug', $s)))
            // "any" jobs accept both, so a female/male filter keeps them.
            ->when(in_array($f['gender'] ?? null, ['male', 'female']), fn ($q) => $q->whereIn('gender', [$f['gender'], 'any']))
            ->when($f['q'] ?? null, function ($q, $term) {
                $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $term).'%';
                $q->where(fn ($w) => $w->where('title_en', 'like', $like)
                    ->orWhere('employer_type_en', 'like', $like)
                    ->orWhere('city_en', 'like', $like)
                    ->orWhereHas('country', fn ($c) => $c->where('name_en', 'like', $like))
                    ->orWhereHas('industry', fn ($i) => $i->where('name_en', 'like', $like)));
            })
            ->when(($f['sort'] ?? 'newest') === 'deadline', fn ($q) => $q->orderByRaw('deadline is null')->orderBy('deadline'))
            ->when(($f['sort'] ?? null) === 'salary', fn ($q) => $q->orderByDesc('salary_max'))
            ->latest()
            ->get()->map->toDetail(); // full detail feeds the contact dialog

        // Facet options: only countries/industries that currently have open jobs, with counts.
        $counts = (clone $base)->selectRaw('country_id, industry_id')->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'total' => $counts->count(),
            'filters' => $f + ['sort' => $f['sort'] ?? 'newest'],
            'countries' => Country::whereIn('id', $counts->pluck('country_id'))->orderBy('sort')->get()
                ->map(fn ($c) => ['slug' => $c->slug, 'name' => $c->name, 'iso2' => $c->iso2, 'count' => $counts->where('country_id', $c->id)->count()]),
            'industries' => Industry::whereIn('id', $counts->pluck('industry_id')->filter())->orderBy('sort')->get()
                ->map(fn ($i) => ['slug' => $i->slug, 'name' => $i->toCard()['name'], 'count' => $counts->where('industry_id', $i->id)->count()]),
            // Shown when the board is empty: where demand is, so the page is still useful.
            'destinations' => Country::active()->orderBy('sort')->limit(8)->get()->map->toCard(),
        ]);
    }
    // shortcut: no job detail page yet — cards open a WhatsApp/Call dialog. Add show() + Pages/Jobs/Show when needed.
}
