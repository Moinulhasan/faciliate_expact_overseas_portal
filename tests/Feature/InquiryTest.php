<?php

namespace Tests\Feature;

use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

// Runs on in-memory SQLite (phpunit.xml) — never touches the app database.
class InquiryTest extends TestCase
{
    use RefreshDatabase;

    private array $valid = [
        'type' => 'employer',
        'name' => 'Test Person',
        'email' => 'person@example.com',
        'phone' => '+880 1711 000000',
        'company' => 'Example Co',
        'message' => 'We need 20 welders for Qatar next month.',
        'page' => '/contact',
    ];

    public function test_inquiry_is_saved_and_emailed_to_the_inquiry_inbox(): void
    {
        Mail::fake();

        $this->post('/inquiries', $this->valid)->assertRedirect()->assertSessionHas('inquiry_sent', true);

        $inquiry = Inquiry::sole();
        $this->assertSame('person@example.com', $inquiry->email);
        $this->assertNotNull($inquiry->mailed_at);
        Mail::assertSent(InquiryReceived::class, fn ($m) => $m->hasTo('info@facilitatexpat.com') && $m->hasReplyTo('person@example.com'));
    }

    public function test_invalid_input_is_rejected_with_field_errors(): void
    {
        Mail::fake();

        $this->post('/inquiries', ['type' => 'job', 'email' => 'not-an-email', 'message' => 'short'])
            ->assertSessionHasErrors(['name', 'email', 'message']);

        $this->assertSame(0, Inquiry::count());
        Mail::assertNothingSent();
    }

    public function test_honeypot_blocks_bots(): void
    {
        Mail::fake();

        $this->post('/inquiries', [...$this->valid, 'website' => 'http://spam.example'])->assertSessionHasErrors('website');

        $this->assertSame(0, Inquiry::count());
    }

    public function test_inquiry_is_kept_when_mail_fails(): void
    {
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP down'));

        $this->post('/inquiries', $this->valid)->assertSessionHas('inquiry_sent', true);

        $this->assertNull(Inquiry::sole()->mailed_at);
    }

    public function test_sixth_request_in_a_minute_is_throttled_with_a_form_error(): void
    {
        Mail::fake();

        for ($i = 0; $i < 5; $i++) {
            $this->post('/inquiries', $this->valid);
        }
        $this->post('/inquiries', $this->valid)->assertSessionHasErrors('form');

        $this->assertSame(5, Inquiry::count());
    }
}
