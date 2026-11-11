<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

// Old SPA URLs (CLAUDE.md §3) — registered first so /industries/details/{id} isn't caught by {industry}.
Route::permanentRedirect('/services', '/work-abroad');
Route::get('/services/details/{id}', fn () => redirect('/work-abroad', 301));
Route::permanentRedirect('/about-us', '/about');
Route::get('/country/{slug}', fn (string $slug) => redirect("/countries/{$slug}", 301));
Route::get('/industries/details/{id}', fn () => redirect('/industries', 301));

Route::get('/', HomeController::class)->name('home');

Route::get('/industries', [IndustryController::class, 'index'])->name('industries.index');
Route::get('/industries/{industry}', [IndustryController::class, 'show'])->name('industries.show');
Route::get('/countries', [CountryController::class, 'index'])->name('countries.index');
Route::get('/countries/{country}', [CountryController::class, 'show'])->name('countries.show');

Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/work-abroad', [PageController::class, 'workAbroad'])->name('work-abroad');
Route::get('/employers', [PageController::class, 'employers'])->name('employers');
Route::get('/about', [PageController::class, 'about'])->name('about');

Route::get('/contact', [InquiryController::class, 'create'])->name('contact');
Route::post('/inquiries', [InquiryController::class, 'store'])->middleware('throttle:5,1')->name('inquiries.store');

Route::get('/sitemap.xml', SitemapController::class);
