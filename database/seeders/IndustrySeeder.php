<?php

namespace Database\Seeders;

use App\Models\Industry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

// Content lives in database/data/industries.php (+ industries.bn.php); FAQs and meta are templated in
// English and Bangla so every page is consistent in both languages.
class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        $countriesBn = require database_path('data/countries.bn.php');
        $allBn = require database_path('data/industries.bn.php');

        // Which countries hire each industry (from country sector lists).
        $hiring = $hiringBn = [];
        foreach (require database_path('data/countries.php') as $c) {
            foreach ($c['sectors'] as [$slug]) {
                $hiring[$slug][] = $c['name'];
                $hiringBn[$slug][] = $countriesBn[$c['slug']]['name'] ?? $c['name'];
            }
        }

        foreach (require database_path('data/industries.php') as $i => $d) {
            $countries = $hiring[$d['slug']] ?? [];
            $roles = implode(', ', array_slice($d['roles'], 0, 3));
            $lname = strtolower($d['name']);
            $bn = $allBn[$d['slug']] ?? [];

            Industry::updateOrCreate(['slug' => $d['slug']], [
                'name_en' => $d['name'],
                'name_bn' => $bn['name'] ?? null,
                'group' => $d['group'],
                'image' => $d['image'],
                'summary_en' => $d['summary'],
                'summary_bn' => $bn['summary'] ?? null,
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
                        'a' => 'Yes. Send the trades, numbers and start date through our inquiry form or WhatsApp, and we reply with a deployment plan.'],
                    ['q' => 'Do workers pay to apply?',
                        'a' => 'No. Applying and being shortlisted is free. Any cost is explained in writing before anything is paid.'],
                ])),
                'meta_description_en' => Str::limit("{$d['name']} jobs abroad for Bangladeshi workers: {$roles} and more. ".
                    'Licensed recruiter for the Gulf, Asia and Europe.', 158),
                'i18n' => $bn ? ['bn' => [
                    'name' => $bn['name'],
                    'summary' => $bn['summary'],
                    'intro' => $bn['intro'],
                    'roles' => $bn['roles'],
                    'certifications' => $bn['certifications'],
                    'highlights' => $bn['highlights'],
                    // "{name}: …" keeps the industry name free of Bangla case endings (always grammatical).
                    'faqs' => array_values(array_filter([
                        ($hiringBn[$d['slug']] ?? []) ? ['q' => "{$bn['name']}: কোন কোন দেশে বাংলাদেশি কর্মী নেয়?",
                            'a' => 'আমরা এখন নিয়োগ দিচ্ছি: '.implode(', ', $hiringBn[$d['slug']]).'। খোলা চাকরি প্রায়ই বদলায় — চাকরির পাতা দেখুন বা উপদেষ্টাকে জিজ্ঞেস করুন।'] : null,
                        ['q' => "{$bn['name']}: আবেদন করতে কী কী লাগবে?",
                            'a' => 'বৈধ পাসপোর্টের সাথে: '.implode('; ', $bn['certifications']).'। শর্টলিস্টের আগে আমরা প্রতিটি কাগজ যাচাই করি।'],
                        ['q' => "{$bn['name']}: নিয়োগকর্তারা কি একসাথে অনেক কর্মী নিতে পারেন?",
                            'a' => 'হ্যাঁ। অনুসন্ধান ফর্ম বা হোয়াটসঅ্যাপে পেশা, সংখ্যা ও শুরুর তারিখ জানান — আমরা একটি পরিকল্পনা পাঠাব।'],
                        ['q' => 'কর্মীদের কি আবেদনের জন্য টাকা দিতে হয়?',
                            'a' => 'না। আবেদন ও শর্টলিস্ট হওয়া বিনামূল্যে। কোনো খরচ থাকলে টাকা দেওয়ার আগে লিখিতভাবে জানানো হয়।'],
                    ])),
                    'meta_description' => Str::limit("{$bn['name']} — বাংলাদেশি কর্মীদের জন্য বিদেশে চাকরি: ".implode(', ', array_slice($bn['roles'], 0, 3)).
                        ' ও আরও। উপসাগরীয় দেশ, এশিয়া ও ইউরোপের জন্য লাইসেন্সপ্রাপ্ত রিক্রুটার।', 158),
                ]] : null,
                'sort' => $i,
            ]);
        }
    }
}
