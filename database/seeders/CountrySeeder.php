<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

// Content lives in database/data/countries.php; this seeder applies the shared templates
// (process steps, base document checklist, FAQs, meta) so every country page has the same structure.
class CountrySeeder extends Seeder
{
    public const BASE_DOCS = [
        'Passport valid for at least 6 months, with 2 blank pages',
        'National ID (NID) or birth certificate',
        'Recent passport-size photos (white background)',
        'Educational certificates',
        'Experience letters / trade certificates',
        'Police clearance certificate',
        'Medical fitness report from an approved centre',
    ];

    public static function steps(string $process): array
    {
        $tail = [
            ['BMET clearance & smart card', 'Government emigration clearance and your BMET smart card.'],
            ['Briefing & flight', 'Pre-departure briefing, contract explained in your language, ticket booked.'],
        ];

        $s = match ($process) {
            'gcc' => [
                ['Apply & screening', 'Send your details and documents. We check them and call you.'],
                ['Trade test / interview', 'Show your skill to the employer, in person or online.'],
                ['Offer & contract', 'You receive the job offer and contract terms in writing.'],
                ['GAMCA medical', 'Health check at a GAMCA-approved medical centre.'],
                ['Work visa issued', 'Employer obtains the visa; it is stamped or issued electronically.'],
                ...$tail,
                ['Arrival & residence ID', 'Local medical and residence ID after you arrive. We stay in touch.'],
            ],
            'qatar' => [
                ['Apply & screening', 'Send your details and documents. We check them and call you.'],
                ['Trade test / interview', 'Show your skill to the employer, in person or online.'],
                ['Offer & contract', 'You receive the job offer and contract terms in writing.'],
                ['Qatar Visa Center (Dhaka)', 'Medical, biometrics and contract signing at QVC Dhaka.'],
                ['Work visa issued', 'Visa issued after QVC clearance.'],
                ...$tail,
                ['Arrival & QID', 'Residence permit (QID) issued in Qatar. We stay in touch.'],
            ],
            'singapore' => [
                ['Apply & screening', 'Send your details and documents. We check them and call you.'],
                ['Skills test', 'Construction trades pass a skills test at an approved testing centre.'],
                ['Employer interview', 'Interview with the employer, in person or online.'],
                ['In-Principle Approval', 'Employer receives Work Permit approval (IPA) from MOM.'],
                ['Medical', 'Pre-departure medical as required.'],
                ...$tail,
                ['Arrival & Work Permit card', 'Work Permit card issued after arrival. We stay in touch.'],
            ],
            'malaysia' => [
                ['Apply & screening', 'Send your details and documents. We check them and call you.'],
                ['Employer interview', 'Interview with an employer that holds an approved quota.'],
                ['Medical', 'Medical at an approved centre in Bangladesh.'],
                ['Calling visa (VDR)', 'Employer obtains your visa approval.'],
                ...$tail,
                ['Arrival & PLKS', 'FOMEMA medical and work pass issued in Malaysia. We stay in touch.'],
            ],
            'japan' => [
                ['Apply & screening', 'Send your details and documents. We check them and call you.'],
                ['Japanese language test', 'Pass JFT-Basic or JLPT N4.'],
                ['SSW skills test', 'Pass the skills test for your field (e.g. caregiving, food service).'],
                ['Employer interview', 'Interview with the Japanese employer, usually online.'],
                ['Certificate of Eligibility', 'Employer obtains your CoE from Japanese immigration.'],
                ['Visa at Embassy of Japan', 'Visa issued by the Embassy of Japan in Dhaka.'],
                ...$tail,
            ],
            'korea' => [
                ['Check your route', 'We confirm whether you fit EPS (E-9) or a skilled employer-sponsored visa (E-7).'],
                ['EPS-TOPIK test', 'Korean language test required for the E-9 route.'],
                ['Skills & documents', 'Skills test where required; documents prepared and checked.'],
                ['Employer selection', 'A Korean employer selects you and signs the contract.'],
                ['Visa issued', 'Visa issued after the employer’s permit is approved.'],
                ...$tail,
            ],
            default => [ // europe
                ['Apply & CV screening', 'Send your details and an English CV. We check them and call you.'],
                ['Employer interview', 'Interview with the employer, usually online.'],
                ['Work permit filed', 'The employer applies for your work permit in the destination country.'],
                ['Work permit approved', 'Approval issued; timing depends on the country and quota.'],
                ['Embassy & national visa', 'Appointment and D-type visa. The embassy may be outside Bangladesh (e.g. New Delhi).'],
                ...$tail,
                ['Arrival & residence card', 'Residence card issued after arrival. We stay in touch.'],
            ],
        };

        return array_map(fn ($x) => ['title' => $x[0], 'body' => $x[1]], $s);
    }

    public function run(): void
    {
        $industries = collect(require database_path('data/industries.php'))->keyBy('slug');

        foreach (require database_path('data/countries.php') as $i => $c) {
            [$min, $max] = $c['days'];
            $sectorNames = array_map(fn ($s) => $industries[$s[0]]['name'], $c['sectors']);

            Country::updateOrCreate(['slug' => $c['slug']], [
                'name_en' => $c['name'],
                'iso2' => $c['iso2'],
                'region' => $c['region'],
                'lat' => $c['lat'],
                'lng' => $c['lng'],
                'visa_type_en' => $c['visa'],
                'currency' => $c['currency'],
                'languages_en' => $c['languages'],
                'processing_days_min' => $min,
                'processing_days_max' => $max,
                'contract_months_typical' => $c['contract'],
                'intro_en' => $c['intro'],
                'notice_en' => $c['notice'] ?? null,
                'sectors' => array_map(fn ($s) => ['industry' => $s[0], 'note' => $s[1]], $c['sectors']),
                'top_trades' => $sectorNames,
                'steps' => self::steps($c['process']),
                'requirements' => [...self::BASE_DOCS, ...$c['extra_docs']],
                'faqs' => [
                    ['q' => "How long does a {$c['name']} work visa take from Bangladesh?",
                        'a' => "Typically {$min}–{$max} days from a complete file, depending on the employer and trade. Your advisor gives you a timeline for your case."],
                    ['q' => "What visa do I need to work in {$c['name']}?",
                        'a' => "Most workers go on a {$c['visa']}. The employer sponsors it; we prepare and check your documents."],
                    ['q' => "How long is a typical contract in {$c['name']}?",
                        'a' => "Usually around {$c['contract']} months, often renewable. The exact term is written in your contract before you sign."],
                    ['q' => 'Do I pay anything to apply?',
                        'a' => 'No. Applying and being shortlisted is free. Any cost is explained in writing before you pay.'],
                ],
                // ≤ ~160 chars so search results don't truncate.
                'meta_description_en' => \Illuminate\Support\Str::limit(
                    "Work in {$c['name']} from Bangladesh: {$c['visa']}, typical {$min}–{$max} days. ".
                    'Jobs in '.strtolower(implode(', ', array_slice($sectorNames, 0, 2))).'. Licensed recruiter.', 158),
                'is_active' => true,
                'sort' => $i,
            ]);
        }
    }
}
