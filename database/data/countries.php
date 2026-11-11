<?php

/*
 | Standardised country content (EN). Source: legacy CountryListData (intro paragraphs + sector lists),
 | condensed into one schema. Facts (visa type, processing days, contract, currency) were MISSING on the
 | old site and are added here as typical ranges — the UI labels them "typical; your advisor confirms".
 | TODO(ops): verify every fact row below before launch; update when rules change.
 |
 | process: gcc | qatar | singapore | malaysia | japan | korea | europe  (templates in CountrySeeder)
 | sectors: [industry slug, country-specific note]
 */

return [
    // ── GCC ─────────────────────────────────────────────────────────────
    [
        'slug' => 'saudi-arabia', 'name' => 'Saudi Arabia', 'iso2' => 'SA', 'region' => 'gcc', 'lat' => 23.89, 'lng' => 45.08,
        'visa' => 'Work visa + Iqama (residence permit)', 'currency' => 'SAR', 'days' => [45, 90], 'contract' => 24, 'languages' => 'Arabic; English on most sites',
        'process' => 'gcc',
        'intro' => 'Saudi Arabia is the largest destination for Bangladeshi workers. Giga-projects, oil & gas and a growing service sector keep demand high for skilled tradespeople, technicians and healthcare staff.',
        'sectors' => [
            ['oil-gas', 'Drilling crew, pipeline teams, refinery technicians and safety officers for upstream to downstream operations.'],
            ['construction', 'Civil engineers, supervisors and heavy-equipment operators for large-scale infrastructure projects.'],
            ['healthcare', 'Nurses, technicians and caregivers for hospitals and medical institutions.'],
            ['security', 'Guards and supervisors with corporate and industrial security training.'],
            ['education', 'Teachers and vocational trainers for the growing education sector.'],
        ],
        'extra_docs' => ['Professional / skill verification for listed trades, where required'],
    ],
    [
        'slug' => 'uae', 'name' => 'United Arab Emirates', 'iso2' => 'AE', 'region' => 'gcc', 'lat' => 23.42, 'lng' => 53.85,
        'visa' => 'Employment visa + Emirates ID', 'currency' => 'AED', 'days' => [30, 60], 'contract' => 24, 'languages' => 'Arabic; English widely used',
        'process' => 'gcc',
        'intro' => 'The UAE hires across hospitality, construction, engineering and services, with Dubai and Abu Dhabi the main hubs. Employers value English, customer service and verified experience.',
        'sectors' => [
            ['hospitality', 'Hotel, restaurant and catering staff for one of the world’s busiest hospitality markets.'],
            ['construction', 'Site workers and supervisors for residential, commercial and infrastructure projects.'],
            ['engineering-technical', 'Engineers, technicians and IT support staff for projects and operations.'],
            ['office-admin', 'Admin and accounts staff for banking, finance and corporate offices.'],
            ['drivers', 'Light and heavy vehicle drivers, chauffeurs and delivery riders.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'qatar', 'name' => 'Qatar', 'iso2' => 'QA', 'region' => 'gcc', 'lat' => 25.35, 'lng' => 51.18,
        'visa' => 'Work visa + Residence Permit (QID)', 'currency' => 'QAR', 'days' => [45, 75], 'contract' => 24, 'languages' => 'Arabic; English widely used',
        'process' => 'qatar',
        'intro' => 'Qatar recruits for petrochemicals, construction and facility services. Medical checks, biometrics and contract signing for Bangladeshi workers are done at the Qatar Visa Center in Dhaka before travel.',
        'sectors' => [
            ['oil-gas', 'Petrochemical and gas-plant workers, technicians and safety staff.'],
            ['construction', 'Skilled and general labour for construction projects.'],
            ['facility-management', 'Cleaning, maintenance and support staff for facilities.'],
            ['office-admin', 'Finance and administrative staff for project and company offices.'],
        ],
        'extra_docs' => ['Qatar Visa Center (QVC) appointment for medical and biometrics'],
    ],
    [
        'slug' => 'kuwait', 'name' => 'Kuwait', 'iso2' => 'KW', 'region' => 'gcc', 'lat' => 29.31, 'lng' => 47.48,
        'visa' => 'Work visa (Article 18) + Civil ID', 'currency' => 'KWD', 'days' => [60, 90], 'contract' => 24, 'languages' => 'Arabic; English on most sites',
        'process' => 'gcc',
        'intro' => 'Kuwait hires for oil & gas, construction and healthcare. Employers look for verified experience and clean medical and police records.',
        'sectors' => [
            ['oil-gas', 'Oil & gas professionals and field technicians.'],
            ['construction', 'Construction workers and site supervisors.'],
            ['healthcare', 'Nurses, technicians and care staff.'],
            ['mep', 'Electricians, plumbers and HVAC technicians for engineering services.'],
        ],
        'extra_docs' => [],
    ],

    // ── East Asia ───────────────────────────────────────────────────────
    [
        'slug' => 'japan', 'name' => 'Japan', 'iso2' => 'JP', 'region' => 'east_asia', 'lat' => 36.20, 'lng' => 138.25,
        'visa' => 'Specified Skilled Worker (SSW)', 'currency' => 'JPY', 'days' => [120, 240], 'contract' => 36, 'languages' => 'Japanese (JFT-Basic or JLPT N4 minimum)',
        'process' => 'japan',
        'intro' => 'Japan’s Specified Skilled Worker programme opens jobs in caregiving, manufacturing, food service and construction. You need to pass a Japanese language test and a skills test for your field before an employer can sponsor you.',
        'sectors' => [
            ['healthcare', 'Caregivers and elderly-care workers — one of the largest SSW fields.'],
            ['manufacturing', 'Production, machining and automotive-parts workers.'],
            ['hospitality', 'Food-service and restaurant staff.'],
            ['engineering-technical', 'Technicians and engineers for manufacturing and IT.'],
        ],
        'extra_docs' => ['Japanese language test certificate (JFT-Basic or JLPT N4)', 'SSW skills test certificate for your field'],
    ],
    [
        'slug' => 'south-korea', 'name' => 'South Korea', 'iso2' => 'KR', 'region' => 'east_asia', 'lat' => 35.91, 'lng' => 127.77,
        'visa' => 'E-9 (Employment Permit System) / E-7 skilled', 'currency' => 'KRW', 'days' => [120, 270], 'contract' => 36, 'languages' => 'Korean (EPS-TOPIK for E-9)',
        'process' => 'korea',
        'notice' => 'E-9 jobs from Bangladesh are allocated through the government Employment Permit System (EPS). We help with preparation and documents; skilled E-7 roles are employer-sponsored. Ask your advisor which route fits you.',
        'intro' => 'South Korea hires foreign workers for manufacturing, shipbuilding, agriculture and technical roles. Most entry-level jobs go through the EPS programme, which requires the EPS-TOPIK Korean test.',
        'sectors' => [
            ['manufacturing', 'Factory, automotive and electronics production workers.'],
            ['engineering-technical', 'Skilled technicians and engineers (E-7) for industry.'],
            ['agriculture', 'Farm and livestock workers under EPS.'],
            ['healthcare', 'Care workers where programmes allow.'],
        ],
        'extra_docs' => ['EPS-TOPIK score report (E-9 route)'],
    ],

    // ── South-East Asia ─────────────────────────────────────────────────
    [
        'slug' => 'singapore', 'name' => 'Singapore', 'iso2' => 'SG', 'region' => 'se_asia', 'lat' => 1.35, 'lng' => 103.82,
        'visa' => 'Work Permit / S Pass', 'currency' => 'SGD', 'days' => [45, 90], 'contract' => 24, 'languages' => 'English',
        'process' => 'singapore',
        'intro' => 'Singapore hires Bangladeshi workers mainly for construction, marine and process industries. Construction workers usually pass a skills test at an approved testing centre before the employer applies for the Work Permit.',
        'sectors' => [
            ['construction', 'Skills-tested construction tradespeople for building and infrastructure.'],
            ['mep', 'Electricians, plumbers and HVAC technicians.'],
            ['hospitality', 'Hospitality and service staff.'],
            ['healthcare', 'Healthcare support and care staff.'],
        ],
        'extra_docs' => ['Skills test certificate from an approved overseas testing centre (construction trades)'],
    ],
    [
        'slug' => 'malaysia', 'name' => 'Malaysia', 'iso2' => 'MY', 'region' => 'se_asia', 'lat' => 4.21, 'lng' => 101.98,
        'visa' => 'Temporary Employment Visit Pass (PLKS)', 'currency' => 'MYR', 'days' => [60, 120], 'contract' => 36, 'languages' => 'Malay; English widely used',
        'process' => 'malaysia',
        'notice' => 'Intake from Bangladesh depends on Malaysian government approvals and employer quotas. Ask your advisor for the current status before you apply.',
        'intro' => 'Malaysia employs many Bangladeshi workers in plantations, manufacturing and construction. Employers must hold an approved quota before they can recruit.',
        'sectors' => [
            ['agriculture', 'Plantation and agricultural workers.'],
            ['manufacturing', 'Factory and production staff.'],
            ['construction', 'Construction and site workers.'],
            ['engineering-technical', 'Engineering and technical professionals.'],
        ],
        'extra_docs' => ['Medical at an approved centre (FOMEMA follow-up after arrival)'],
    ],

    // ── Europe ──────────────────────────────────────────────────────────
    [
        'slug' => 'italy', 'name' => 'Italy', 'iso2' => 'IT', 'region' => 'europe', 'lat' => 41.87, 'lng' => 12.57,
        'visa' => 'Work permit (Nulla Osta) + national D visa', 'currency' => 'EUR', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Italian (basic helps)',
        'process' => 'europe',
        'notice' => 'Italy issues non-seasonal and seasonal work permits under annual quotas (Decreto Flussi). Availability depends on the quota window.',
        'intro' => 'Italy recruits non-EU workers through annual quotas for manufacturing, construction, agriculture and hospitality. The employer applies for the work permit (Nulla Osta) in Italy first.',
        'sectors' => [
            ['manufacturing', 'Manufacturing and fashion-industry workers.'],
            ['construction', 'Construction workers and tradespeople.'],
            ['hospitality', 'Hospitality and tourism staff.'],
            ['agriculture', 'Seasonal and permanent agricultural workers.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'poland', 'name' => 'Poland', 'iso2' => 'PL', 'region' => 'europe', 'lat' => 51.92, 'lng' => 19.15,
        'visa' => 'Work permit (Type A) + national D visa', 'currency' => 'PLN', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Polish (basic helps); English at some employers',
        'process' => 'europe',
        'intro' => 'Poland’s logistics, construction and hospitality sectors hire workers from Bangladesh. Forklift operators, warehouse staff, hotel staff and construction trades are in steady demand.',
        'sectors' => [
            ['transport-logistics', 'Warehouse, forklift and logistics staff for distribution centres.'],
            ['construction', 'Bricklayers, plumbers and construction supervisors.'],
            ['hospitality', 'Hotel, restaurant and event staff.'],
            ['engineering-technical', 'IT and technical professionals.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'czech-republic', 'name' => 'Czech Republic', 'iso2' => 'CZ', 'region' => 'europe', 'lat' => 49.82, 'lng' => 15.47,
        'visa' => 'Employee Card', 'currency' => 'CZK', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Czech (basic helps)',
        'process' => 'europe',
        'intro' => 'The Czech automotive and manufacturing industry hires production and technical staff from abroad on the Employee Card, which combines work and residence.',
        'sectors' => [
            ['manufacturing', 'Automotive and manufacturing production workers.'],
            ['engineering-technical', 'Technicians and engineers.'],
            ['healthcare', 'Healthcare support staff.'],
            ['transport-logistics', 'Warehouse and logistics staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'hungary', 'name' => 'Hungary', 'iso2' => 'HU', 'region' => 'europe', 'lat' => 47.16, 'lng' => 19.50,
        'visa' => 'Guest-worker residence permit', 'currency' => 'HUF', 'days' => [90, 180], 'contract' => 24, 'languages' => 'Hungarian (basic helps)',
        'process' => 'europe',
        'intro' => 'Hungary hires industrial, construction and technical workers through its guest-worker permit, usually via qualified employers.',
        'sectors' => [
            ['manufacturing', 'Industrial and factory workforce.'],
            ['construction', 'Construction and civil-engineering workers.'],
            ['engineering-technical', 'IT and technical staff.'],
            ['healthcare', 'Medical and healthcare professionals.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'slovakia', 'name' => 'Slovakia', 'iso2' => 'SK', 'region' => 'europe', 'lat' => 48.67, 'lng' => 19.70,
        'visa' => 'Temporary residence for employment', 'currency' => 'EUR', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Slovak (basic helps)',
        'process' => 'europe',
        'intro' => 'Slovakia’s car plants and suppliers hire production and technical workers from abroad.',
        'sectors' => [
            ['manufacturing', 'Automotive industry and manufacturing workers.'],
            ['engineering-technical', 'Technical specialists.'],
            ['healthcare', 'Healthcare support staff.'],
            ['transport-logistics', 'Warehouse and logistics staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'croatia', 'name' => 'Croatia', 'iso2' => 'HR', 'region' => 'europe', 'lat' => 45.10, 'lng' => 15.20,
        'visa' => 'Work and stay permit', 'currency' => 'EUR', 'days' => [60, 150], 'contract' => 12, 'languages' => 'Croatian (basic helps); English in tourism',
        'process' => 'europe',
        'intro' => 'Croatia hires seasonal and year-round workers for tourism, construction and manufacturing, with peak demand before the summer season.',
        'sectors' => [
            ['hospitality', 'Hotel, restaurant and tourism staff, often seasonal.'],
            ['construction', 'Construction workers and tradespeople.'],
            ['manufacturing', 'Manufacturing workers.'],
            ['transport-logistics', 'Logistics and warehouse staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'bulgaria', 'name' => 'Bulgaria', 'iso2' => 'BG', 'region' => 'europe', 'lat' => 42.73, 'lng' => 25.49,
        'visa' => 'Single permit for work and residence', 'currency' => 'EUR', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Bulgarian (basic helps)',
        'process' => 'europe',
        'intro' => 'Bulgaria hires manufacturing, agricultural and construction workers, plus security staff, through the single work-and-residence permit.',
        'sectors' => [
            ['manufacturing', 'Manufacturing and industrial workers.'],
            ['agriculture', 'Agricultural labour.'],
            ['construction', 'Construction and engineering workers.'],
            ['security', 'Security and protection staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'romania', 'name' => 'Romania', 'iso2' => 'RO', 'region' => 'europe', 'lat' => 45.94, 'lng' => 24.97,
        'visa' => 'Work permit + long-stay employment visa (D/AM)', 'currency' => 'RON', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Romanian (basic helps)',
        'process' => 'europe',
        'intro' => 'Romania issues work permits under an annual quota for construction, hospitality, healthcare and general labour.',
        'sectors' => [
            ['construction', 'Construction industry staffing.'],
            ['healthcare', 'Healthcare professionals.'],
            ['hospitality', 'Hotel and restaurant staff.'],
            ['transport-logistics', 'Warehouse and general labour.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'moldova', 'name' => 'Moldova', 'iso2' => 'MD', 'region' => 'europe', 'lat' => 47.41, 'lng' => 28.37,
        'visa' => 'Work visa + temporary residence', 'currency' => 'MDL', 'days' => [90, 180], 'contract' => 12, 'languages' => 'Romanian; Russian',
        'process' => 'europe',
        'intro' => 'Moldova hires agricultural and industrial workers, plus some technical and administrative staff.',
        'sectors' => [
            ['agriculture', 'Agriculture and farming labour.'],
            ['manufacturing', 'Skilled industrial workers.'],
            ['engineering-technical', 'IT and engineering staff.'],
            ['office-admin', 'Financial and administrative staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'serbia', 'name' => 'Serbia', 'iso2' => 'RS', 'region' => 'europe', 'lat' => 44.02, 'lng' => 21.01,
        'visa' => 'Single work and residence permit', 'currency' => 'RSD', 'days' => [60, 150], 'contract' => 12, 'languages' => 'Serbian (basic helps)',
        'process' => 'europe',
        'intro' => 'Serbia hires manufacturing and construction workers, with a single permit covering work and residence.',
        'sectors' => [
            ['manufacturing', 'Manufacturing workers.'],
            ['construction', 'Construction labour.'],
            ['engineering-technical', 'IT and technology staff.'],
            ['healthcare', 'Healthcare services staff.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'north-macedonia', 'name' => 'North Macedonia', 'iso2' => 'MK', 'region' => 'europe', 'lat' => 41.61, 'lng' => 21.75,
        'visa' => 'Work permit + residence permit', 'currency' => 'MKD', 'days' => [60, 150], 'contract' => 12, 'languages' => 'Macedonian (basic helps)',
        'process' => 'europe',
        'intro' => 'North Macedonia hires textile, manufacturing and construction workers.',
        'sectors' => [
            ['manufacturing', 'Manufacturing and textile workers.'],
            ['construction', 'Construction workers.'],
            ['healthcare', 'Healthcare services staff.'],
            ['engineering-technical', 'Technical specialists.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'belarus', 'name' => 'Belarus', 'iso2' => 'BY', 'region' => 'europe', 'lat' => 53.71, 'lng' => 27.95,
        'visa' => 'Work permit + work visa', 'currency' => 'BYN', 'days' => [60, 150], 'contract' => 12, 'languages' => 'Russian; Belarusian',
        'process' => 'europe',
        'intro' => 'Belarus hires manufacturing and industrial workers through employer-sponsored permits.',
        'sectors' => [
            ['manufacturing', 'Manufacturing workers.'],
            ['engineering-technical', 'IT and industrial specialists.'],
            ['healthcare', 'Healthcare services staff.'],
            ['construction', 'Construction workers.'],
        ],
        'extra_docs' => [],
    ],
    [
        'slug' => 'albania', 'name' => 'Albania', 'iso2' => 'AL', 'region' => 'europe', 'lat' => 41.15, 'lng' => 20.17,
        'visa' => 'Unique permit (work and residence)', 'currency' => 'ALL', 'days' => [60, 150], 'contract' => 12, 'languages' => 'Albanian (basic helps)',
        'process' => 'europe',
        'intro' => 'Albania hires for construction, manufacturing and a fast-growing tourism sector.',
        'sectors' => [
            ['construction', 'Construction workers.'],
            ['manufacturing', 'Manufacturing labour.'],
            ['hospitality', 'Hospitality and tourism staff.'],
            ['healthcare', 'Healthcare professionals.'],
        ],
        'extra_docs' => [],
    ],
];
