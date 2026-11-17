<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\InquiryReceived;
use App\Models\Country;
use App\Models\Industry;
use App\Models\Inquiry;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class InquiryController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Contact', ['formOptions' => self::formOptions()]);
    }

    /** Country + trade dropdowns for the inquiry form (Home and /contact). */
    public static function formOptions(): array
    {
        return [
            'countries' => Country::active()->orderBy('sort')->get()->map(fn ($c) => ['value' => $c->slug, 'label' => $c->name])->values(),
            'trades' => Industry::orderBy('sort')->get()->map(fn ($i) => ['value' => $i->slug, 'label' => $i->toCard()['name']])->values(),
        ];
    }

    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        // Save first: the DB row is the source of truth even if the mail server is down.
        $inquiry = Inquiry::create([
            ...$request->safe()->except(['website', 'consent']),
            'locale' => app()->getLocale(),
            'ip' => $request->ip(),
            'consent_at' => now(),
        ]);

        try {
            Mail::to(SiteContent::get('site.contact', config('site.contact'))['inquiry_email'])->send(new InquiryReceived($inquiry));
            $inquiry->update(['mailed_at' => now()]);
        } catch (Throwable $e) {
            // Don't fail the visitor — the inquiry is saved; ops can find unsent ones by mailed_at IS NULL.
            Log::error('Inquiry email failed', ['inquiry' => $inquiry->id, 'error' => $e->getMessage()]);
        }

        return back()->with('inquiry_sent', true);
    }
}
