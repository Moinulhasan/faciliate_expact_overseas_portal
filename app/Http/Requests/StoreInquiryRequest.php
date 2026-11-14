<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:job,employer,other'],
            'name' => ['required', 'string', 'min:2', 'max:100'],
            // Phone/WhatsApp is the main channel for workers; email is optional (UX audit 13 Nov 2026).
            'phone' => ['required', 'string', 'max:30', 'regex:/^[0-9+\-\s()]{6,30}$/'],
            'email' => ['nullable', 'email:rfc', 'max:150'],
            'company' => ['nullable', 'string', 'max:120'],
            'country' => ['nullable', 'string', 'exists:countries,slug'],
            'trade' => ['nullable', 'string', 'exists:industries,slug'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'page' => ['nullable', 'string', 'max:255'],
            'consent' => ['accepted'],
            // Honeypot: real users never see or fill it.
            'website' => ['prohibited'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => __('contact.errors.name'),
            'phone.required' => __('contact.errors.phone'),
            'phone.regex' => __('contact.errors.phone'),
            'email.email' => __('contact.errors.email'),
            'message.required' => __('contact.errors.message'),
            'message.min' => __('contact.errors.message'),
            'consent.accepted' => __('contact.errors.consent'),
        ];
    }
}
