<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Industry;
use App\Models\JobOpening;
use Illuminate\Database\Seeder;

// DESIGN SAMPLES ONLY — flagged is_sample, hidden in production by JobOpening::scopeOpen(), badged "Sample" in the UI.
// Real openings come from the admin panel (phase 3/8). Never present these as real vacancies.
class SampleJobSeeder extends Seeder
{
    public function run(): void
    {
        $c = fn ($s) => Country::where('slug', $s)->value('id');
        $i = fn ($s) => Industry::where('slug', $s)->value('id');
        $gcc = ['accommodation' => true, 'food' => false, 'transport' => true, 'ticket' => true, 'medical' => true, 'overtime' => true];

        $rows = [
            ['welder-6g-saudi-arabia', 'Pipeline welder (6G)', 'saudi-arabia', 'oil-gas', 20, 'Oil & gas contractor', 'Jubail', 1800, 2600, 'SAR', 24, 'male', 21, '8 h/day, 6 days', $gcc,
                ['6G welding certificate', '3+ years pipeline welding', 'Passport valid 2+ years']],
            ['shuttering-carpenter-qatar', 'Shuttering carpenter', 'qatar', 'construction', 35, 'Building contractor', 'Doha', 1500, 2000, 'QAR', 24, 'male', 14, '8 h/day, 6 days', $gcc,
                ['Trade test at approved centre', '2+ years site experience']],
            ['commis-chef-uae', 'Commis chef', 'uae', 'hospitality', 8, 'Hotel group', 'Dubai', 1800, 2400, 'AED', 24, 'any', 30, '9 h/day, 6 days', ['accommodation' => true, 'food' => true, 'transport' => true, 'ticket' => true, 'medical' => true, 'overtime' => false],
                ['Hotel kitchen experience', 'Food hygiene certificate', 'Basic English']],
            ['electrician-kuwait', 'Building electrician', 'kuwait', 'mep', 12, 'MEP contractor', 'Kuwait City', 150, 220, 'KWD', 24, 'male', 4, '8 h/day, 6 days', $gcc,
                ['Electrical trade certificate', '3+ years building wiring']],
            ['caregiver-ssw-japan', 'Care worker (SSW)', 'japan', 'healthcare', 6, 'Elderly care facility', 'Osaka', 180000, 230000, 'JPY', 36, 'any', 45, '8 h/day, shift work', ['accommodation' => null, 'food' => false, 'transport' => true, 'ticket' => true, 'medical' => true, 'overtime' => true],
                ['JFT-Basic or JLPT N4', 'SSW caregiving skills test', 'Caregiving training or experience']],
            ['warehouse-operative-poland', 'Warehouse operative', 'poland', 'transport-logistics', 25, 'Logistics company', 'Poznań', 4600, 5400, 'PLN', 12, 'any', 25, '8 h/day, 5 days, shifts', ['accommodation' => true, 'food' => false, 'transport' => true, 'ticket' => false, 'medical' => true, 'overtime' => true],
                ['Warehouse experience preferred', 'Forklift licence is a plus', 'Basic English']],
            ['machine-operator-malaysia', 'Production machine operator', 'malaysia', 'manufacturing', 40, 'Electronics factory', 'Penang', 1700, 2200, 'MYR', 36, 'any', 10, '8 h/day, 6 days, shifts', $gcc,
                ['Factory experience', 'Good eyesight (colour test)']],
            ['hotel-room-attendant-croatia', 'Hotel room attendant (seasonal)', 'croatia', 'hospitality', 15, 'Seaside resort', 'Split', 1000, 1250, 'EUR', 8, 'female', 35, '8 h/day, 6 days', ['accommodation' => true, 'food' => true, 'transport' => false, 'ticket' => false, 'medical' => true, 'overtime' => true],
                ['Housekeeping experience', 'Basic English']],
        ];

        foreach ($rows as $k => [$slug, $title, $country, $industry, $pos, $emp, $city, $min, $max, $cur, $months, $gender, $days, $hours, $benefits, $req]) {
            JobOpening::updateOrCreate(['slug' => $slug], [
                'title_en' => $title,
                'country_id' => $c($country),
                'industry_id' => $i($industry),
                'positions' => $pos,
                'employer_type_en' => $emp,
                'city_en' => $city,
                'salary_min' => $min,
                'salary_max' => $max,
                'currency' => $cur,
                'contract_months' => $months,
                'working_hours_en' => $hours,
                'gender' => $gender,
                'deadline' => now()->addDays($days)->toDateString(),
                'status' => $days <= 7 ? 'closing' : 'open',
                'description_en' => "{$emp} in {$city} is hiring {$pos} {$title} workers on a {$months}-month contract. Shortlisted candidates are interviewed by the employer; we prepare and check every document.",
                'requirements' => $req,
                'benefits' => $benefits,
                'is_sample' => true,
                'created_at' => now()->subDays($k * 2),
            ]);
        }
    }
}
