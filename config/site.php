<?php

// Single source of truth for business facts (CLAUDE.md §6.3). null = owner has not supplied it yet; UI hides it.
return [
    'name' => 'Facilitate Expat Overseas Limited',
    'main_site' => 'https://facilitatexpat.com',

    'licence' => [
        'rl_number' => env('SITE_RL_NUMBER'),   // TODO(owner): recruiting licence number
        'bmet' => env('SITE_BMET_REG'),         // TODO(owner): BMET registration
        'baira' => env('SITE_BAIRA_MEMBER'),    // TODO(owner): BAIRA membership no.
    ],

    'stats' => [
        'years_licensed' => null,       // TODO(owner)
        'workers_deployed' => null,     // TODO(owner)
        'employer_partners' => null,    // TODO(owner)
        'avg_days_to_deploy' => null,   // TODO(owner)
    ],

    'contact' => [
        'phone' => '+880 17 1970 6041',
        'phone_href' => '+8801719706041',
        'email' => 'rafik@facilitatexpat.com',
        // Website inquiry form recipient (shown next to the form).
        'inquiry_email' => env('SITE_INQUIRY_EMAIL', 'info@facilitatexpat.com'),
        'whatsapp' => env('SITE_WHATSAPP', '8801719706041'), // TODO(owner): confirm WhatsApp Business number
        'address' => '18/3 Naya Paltan, Level-04/B, Mashjid Goli, Dhaka-1000',
        'hours' => null, // TODO(owner): one final version, e.g. "Sat–Thu, 10:00–18:00"
    ],
];
