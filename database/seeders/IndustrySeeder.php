<?php

namespace Database\Seeders;

use App\Models\Industry;
use Illuminate\Database\Seeder;

// Content lives in database/data/industries.php; FAQs and meta are templated so every page is consistent.
class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        // Which countries hire each industry (from country sector lists).
        $hiring = [];
        foreach (require database_path('data/countries.php') as $c) {
            foreach ($c['sectors'] as [$slug]) {
                $hiring[$slug][] = $c['name'];
            }
        }

        foreach (require database_path('data/industries.php') as $i => $d) {
            $countries = $hiring[$d['slug']] ?? [];
            $roles = implode(', ', array_slice($d['roles'], 0, 3));
            $lname = strtolower($d['name']);

            Industry::updateOrCreate(['slug' => $d['slug']], [
                'name_en' => $d['name'],
                'group' => $d['group'],
                'image' => $d['image'],
                'summary_en' => $d['summary'],
                'intro_en' => $d['intro'],
                'roles' => $d['roles'],
                'certifications' => $d['certifications'],
                'highlights' => $d['highlights'],
                'faqs' => array_values(array_filter([
                    $countries ? ['q' => "Which countries hire {$lname} workers from Bangladesh?",
                        'a' => 'We currently recruit for '.implode(', ', $countries).'. Open jobs change often — check the jobs board or ask your advisor.'] : null,
                    ['q' => "What do I need to apply for {$lname} jobs?",
                        'a' => 'A valid passport plus: '.lcfirst(implode('; ', $d['certifications'])).'. We check every document before you are shortlisted.'],
                    ['q' => "Can employers request {$lname} workers in bulk?",
                        'a' => 'Yes. Send the trades, numbers and start date through the manpower request form and we reply with a deployment plan.'],
                    ['q' => 'Do workers pay to apply?',
                        'a' => 'No. Applying and being shortlisted is free. Any cost is explained in writing before anything is paid.'],
                ])),
                'meta_description_en' => \Illuminate\Support\Str::limit("{$d['name']} jobs abroad for Bangladeshi workers: {$roles} and more. ".
                    'Licensed recruiter for the Gulf, Asia and Europe.', 158),
                'sort' => $i,
            ]);
        }
    }
}
