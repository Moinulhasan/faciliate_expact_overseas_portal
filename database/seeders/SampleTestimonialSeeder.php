<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

// Design placeholders ONLY. Flagged is_sample, hidden in production by Testimonial::scopeVisible().
// Replace with real, consented reviews via admin before launch (CLAUDE.md §13).
class SampleTestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $c = fn (string $slug) => Country::where('slug', $slug)->value('id');

        $rows = [
            ['worker', 'Sample worker A', 'Welder', null, 'saudi-arabia', 'They told me every cost on paper before I paid anything. My advisor called me after I landed to check I was settled.', 5],
            ['worker', 'Sample worker B', 'Electrician', null, 'qatar', 'My documents were checked twice and nothing was missing at the embassy. I knew what was happening at every step.', 5],
            ['employer', 'Sample employer', 'HR Manager', 'Sample Contracting Co.', 'uae', 'Candidates arrived trade-tested and ready to work. One contact handled our whole batch from interview to arrival.', 5],
            ['worker', 'Sample worker C', 'Caregiver', null, 'japan', 'The briefing before departure explained my contract clearly. I felt prepared, not rushed.', 5],
            ['employer', 'Sample employer', 'Operations Director', 'Sample Facilities Ltd.', 'poland', 'Clear timelines and honest updates. When a visa slot moved, we heard it from them first.', 4],
            ['worker', 'Sample worker D', 'Cook', null, 'malaysia', 'No broker, no hidden fee. I applied myself and the office guided me through medical and BMET.', 5],
        ];

        foreach ($rows as $i => [$type, $name, $role, $company, $country, $quote, $rating]) {
            Testimonial::updateOrCreate(['name' => $name, 'role_en' => $role], [
                'type' => $type,
                'company' => $company,
                'country_id' => $c($country),
                'quote_en' => $quote,
                'rating' => $rating,
                'is_published' => true,
                'is_sample' => true,
                'sort' => $i,
            ]);
        }
    }
}
