<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
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
        return Inertia::render('Contact');
    }

    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        // Save first: the DB row is the source of truth even if the mail server is down.
        $inquiry = Inquiry::create([
            ...$request->safe()->except(['website']),
            'ip' => $request->ip(),
        ]);

        try {
            Mail::to(config('site.contact.inquiry_email'))->send(new InquiryReceived($inquiry));
            $inquiry->update(['mailed_at' => now()]);
        } catch (Throwable $e) {
            // Don't fail the visitor — the inquiry is saved; ops can find unsent ones by mailed_at IS NULL.
            Log::error('Inquiry email failed', ['inquiry' => $inquiry->id, 'error' => $e->getMessage()]);
        }

        return back()->with('inquiry_sent', true);
    }
}
