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
            'email' => ['required', 'email:rfc', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30', 'regex:/^[0-9+\-\s()]{6,30}$/'],
            'company' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'page' => ['nullable', 'string', 'max:255'],
            // Honeypot: real users never see or fill it.
            'website' => ['prohibited'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => __('contact.errors.name'),
            'email.required' => __('contact.errors.email'),
            'email.email' => __('contact.errors.email'),
            'phone.regex' => __('contact.errors.phone'),
            'message.required' => __('contact.errors.message'),
            'message.min' => __('contact.errors.message'),
        ];
    }
}
