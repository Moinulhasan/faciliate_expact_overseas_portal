<?php

namespace Tests\Feature;

use App\Mail\InquiryReceived;
use App\Models\Country;
use App\Models\Industry;
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
        'phone' => '+880 1711 000000',
        'email' => 'person@example.com',
        'company' => 'Example Co',
        'message' => 'We need 20 welders for Qatar next month.',
        'page' => '/contact',
        'consent' => '1',
    ];

    public function test_inquiry_is_saved_and_emailed_to_the_inquiry_inbox(): void
    {
        Mail::fake();

        $this->post('/inquiries', $this->valid)->assertRedirect()->assertSessionHas('inquiry_sent', true);

        $inquiry = Inquiry::sole();
        $this->assertSame('person@example.com', $inquiry->email);
        $this->assertNotNull($inquiry->mailed_at);
        $this->assertNotNull($inquiry->consent_at);
        $this->assertSame('en', $inquiry->locale);
        Mail::assertSent(InquiryReceived::class, fn ($m) => $m->hasTo('info@facilitatexpat.com') && $m->hasReplyTo('person@example.com'));
    }

    public function test_email_is_optional_but_phone_is_required(): void
    {
        Mail::fake();

        $this->post('/inquiries', [...$this->valid, 'email' => ''])->assertSessionHas('inquiry_sent', true);
        $this->assertNull(Inquiry::sole()->email);
        Mail::assertSent(InquiryReceived::class, fn ($m) => $m->replyTo === []);

        $this->post('/inquiries', [...$this->valid, 'phone' => ''])->assertSessionHasErrors('phone');
        $this->assertSame(1, Inquiry::count());
    }

    public function test_invalid_input_and_missing_consent_are_rejected(): void
    {
        Mail::fake();

        $this->post('/inquiries', ['type' => 'job', 'email' => 'not-an-email', 'message' => 'short'])
            ->assertSessionHasErrors(['name', 'phone', 'email', 'message', 'consent']);

        $this->assertSame(0, Inquiry::count());
        Mail::assertNothingSent();
    }

    public function test_country_and_trade_must_exist(): void
    {
        Mail::fake();
        Country::create(['slug' => 'qatar', 'name_en' => 'Qatar', 'iso2' => 'QA', 'region' => 'gcc', 'lat' => 25, 'lng' => 51]);
        Industry::create(['slug' => 'construction', 'name_en' => 'Construction']);

        $this->post('/inquiries', [...$this->valid, 'country' => 'atlantis', 'trade' => 'wizardry'])->assertSessionHasErrors(['country', 'trade']);
        $this->post('/inquiries', [...$this->valid, 'country' => 'qatar', 'trade' => 'construction'])->assertSessionHas('inquiry_sent', true);

        $this->assertSame(['qatar', 'construction'], [Inquiry::sole()->country, Inquiry::sole()->trade]);
    }

    public function test_bangla_route_records_locale_and_returns_bangla_errors(): void
    {
        Mail::fake();

        $this->post('/bn/inquiries', [...$this->valid, 'name' => ''])->assertSessionHasErrors(['name' => 'আপনার নাম লিখুন।']);
        $this->post('/bn/inquiries', $this->valid)->assertSessionHas('inquiry_sent', true);

        $this->assertSame('bn', Inquiry::sole()->locale);
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
