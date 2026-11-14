<?php

// Single source of truth for business facts (CLAUDE.md §6.3). null = owner has not supplied it yet; UI hides it.
return [
    'name' => 'Facilitate Expat Overseas Limited',
    'main_site' => 'https://facilitatexpat.com',

    'licence' => [
        'rl_number' => env('SITE_RL_NUMBER','RL-2533'),   // TODO(owner): recruiting licence number
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
        'address_my' => 'A-LG-1, Connaught Avenue Cheras, Jalan 9 Taman Bukit Cheras, 56000 Kuala Lumpur, Malaysia',
        'hours' => null, // TODO(owner): one final version, e.g. "Sat–Thu, 10:00–18:00"
    ],

    // Sample jobs/reviews are design placeholders. Opt-in only, so a live server left on APP_ENV=local
    // can never show them (UX audit saw "Sample" badges). Set SITE_SHOW_SAMPLES=true in a local .env only.
    'show_samples' => (bool) env('SITE_SHOW_SAMPLES', false),

    // TODO(owner/legal): confirm retention period and the privacy notice wording (lang/*/privacy.php).
    'privacy' => [
        'retention_months' => 24,
        'updated' => '2026-11-13',
    ],

    // Approximate taka per 1 unit of each salary currency, used to show "≈ ৳…" next to job salaries
    // (UX audit: workers think in taka). Remove a currency to hide its conversion.
    // TODO(owner): APPROXIMATE values — confirm against Bangladesh Bank rates before launch and update monthly.
    'fx' => [
        'as_of' => '2026-11',
        'bdt_per' => [
            'SAR' => 32.5, 'AED' => 33.2, 'QAR' => 33.5, 'KWD' => 397, 'OMR' => 317, 'BHD' => 324,
            'JPY' => 0.80, 'KRW' => 0.088, 'SGD' => 94, 'MYR' => 28.5,
            'EUR' => 140, 'PLN' => 32.5, 'CZK' => 5.6, 'HUF' => 0.33, 'RON' => 28, 'MDL' => 7,
            'RSD' => 1.2, 'MKD' => 2.3, 'BYN' => 37, 'ALL' => 1.4,
        ],
    ],
];
