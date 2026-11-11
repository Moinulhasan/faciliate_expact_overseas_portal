<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Inquiry $inquiry) {}

    public function envelope(): Envelope
    {
        $types = ['job' => 'Job seeker', 'employer' => 'Employer', 'other' => 'General'];

        return new Envelope(
            // Reply goes straight to the person who asked.
            replyTo: [new Address($this->inquiry->email, $this->inquiry->name)],
            subject: "[{$types[$this->inquiry->type]}] New inquiry from {$this->inquiry->name}",
        );
    }

    public function content(): Content
    {
        return new Content(view: 'mail.inquiry');
    }
}
