<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

// Content lives in database/data/countries.php (+ countries.bn.php); this seeder applies the shared templates
// (process steps with typical times, base document checklist, FAQs, meta) in English and Bangla, so every
// country page has the same structure in both languages.
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

    public const BASE_DOCS_BN = [
        'কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট, ২টি খালি পাতাসহ',
        'জাতীয় পরিচয়পত্র (এনআইডি) বা জন্মনিবন্ধন সনদ',
        'সাম্প্রতিক পাসপোর্ট সাইজের ছবি (সাদা ব্যাকগ্রাউন্ড)',
        'শিক্ষাগত সনদ',
        'অভিজ্ঞতার সনদ / ট্রেড সনদ',
        'পুলিশ ক্লিয়ারেন্স সনদ',
        'অনুমোদিত সেন্টারের মেডিকেল ফিটনেস রিপোর্ট',
    ];

    /**
     * Step library: id => [en title, en body, bn title, bn body, en time, bn time].
     * TODO(ops): typical times are generic estimates — confirm per route.
     */
    private const STEPS = [
        'apply' => ['Apply & screening', 'Send your details and documents. We check them and call you.', 'আবেদন ও যাচাই', 'আপনার তথ্য ও কাগজপত্র পাঠান। আমরা যাচাই করে আপনাকে কল করব।', '1–3 days', '১–৩ দিন'],
        'eu_apply' => ['Apply & CV screening', 'Send your details and an English CV. We check them and call you.', 'আবেদন ও সিভি যাচাই', 'আপনার তথ্য ও ইংরেজি সিভি পাঠান। আমরা যাচাই করে আপনাকে কল করব।', '1–3 days', '১–৩ দিন'],
        'trade_test' => ['Trade test / interview', 'Show your skill to the employer, in person or online.', 'ট্রেড টেস্ট / ইন্টারভিউ', 'নিয়োগকর্তাকে আপনার দক্ষতা দেখান — সরাসরি বা অনলাইনে।', '1–3 weeks', '১–৩ সপ্তাহ'],
        'offer' => ['Offer & contract', 'You receive the job offer and contract terms in writing.', 'অফার ও চুক্তি', 'চাকরির অফার ও চুক্তির শর্ত লিখিতভাবে পাবেন।', '2–5 days', '২–৫ দিন'],
        'gamca' => ['GAMCA medical', 'Health check at a GAMCA-approved medical centre.', 'GAMCA মেডিকেল', 'GAMCA-অনুমোদিত মেডিকেল সেন্টারে স্বাস্থ্য পরীক্ষা।', '2–7 days', '২–৭ দিন'],
        'gcc_visa' => ['Work visa issued', 'Employer obtains the visa; it is stamped or issued electronically.', 'ওয়ার্ক ভিসা', 'নিয়োগকর্তা ভিসা নেন; তা স্ট্যাম্প বা ইলেকট্রনিকভাবে ইস্যু হয়।', '2–6 weeks', '২–৬ সপ্তাহ'],
        'qvc' => ['Qatar Visa Center (Dhaka)', 'Medical, biometrics and contract signing at QVC Dhaka.', 'কাতার ভিসা সেন্টার (ঢাকা)', 'ঢাকার QVC-তে মেডিকেল, বায়োমেট্রিক ও চুক্তি স্বাক্ষর।', '1–2 weeks', '১–২ সপ্তাহ'],
        'qatar_visa' => ['Work visa issued', 'Visa issued after QVC clearance.', 'ওয়ার্ক ভিসা', 'QVC ক্লিয়ারেন্সের পর ভিসা ইস্যু হয়।', '1–3 weeks', '১–৩ সপ্তাহ'],
        'sg_skills' => ['Skills test', 'Construction trades pass a skills test at an approved testing centre.', 'দক্ষতা পরীক্ষা', 'নির্মাণ পেশার কর্মীরা অনুমোদিত টেস্টিং সেন্টারে দক্ষতা পরীক্ষা দেন।', '1–3 weeks', '১–৩ সপ্তাহ'],
        'interview' => ['Employer interview', 'Interview with the employer, in person or online.', 'নিয়োগকর্তার ইন্টারভিউ', 'নিয়োগকর্তার সাথে ইন্টারভিউ — সরাসরি বা অনলাইনে।', '1–2 weeks', '১–২ সপ্তাহ'],
        'my_interview' => ['Employer interview', 'Interview with an employer that holds an approved quota.', 'নিয়োগকর্তার ইন্টারভিউ', 'অনুমোদিত কোটা আছে এমন নিয়োগকর্তার সাথে ইন্টারভিউ।', '1–2 weeks', '১–২ সপ্তাহ'],
        'sg_ipa' => ['In-Principle Approval', 'Employer receives Work Permit approval (IPA) from MOM.', 'ইন-প্রিন্সিপল অনুমোদন', 'নিয়োগকর্তা MOM থেকে ওয়ার্ক পারমিটের অনুমোদন (IPA) পান।', '2–4 weeks', '২–৪ সপ্তাহ'],
        'medical' => ['Medical', 'Pre-departure medical at an approved centre.', 'মেডিকেল', 'অনুমোদিত সেন্টারে যাত্রার আগে মেডিকেল।', '2–7 days', '২–৭ দিন'],
        'my_vdr' => ['Calling visa (VDR)', 'Employer obtains your visa approval.', 'কলিং ভিসা (VDR)', 'নিয়োগকর্তা আপনার ভিসার অনুমোদন নেন।', '2–6 weeks', '২–৬ সপ্তাহ'],
        'jp_lang' => ['Japanese language test', 'Pass JFT-Basic or JLPT N4.', 'জাপানি ভাষা পরীক্ষা', 'JFT-Basic বা JLPT N4 পাস করুন।', '2–6 months of study', '২–৬ মাস পড়াশোনা'],
        'jp_ssw' => ['SSW skills test', 'Pass the skills test for your field (e.g. caregiving, food service).', 'SSW দক্ষতা পরীক্ষা', 'আপনার খাতের দক্ষতা পরীক্ষায় পাস করুন (যেমন কেয়ারগিভিং, খাবার পরিবেশন)।', '1–3 months', '১–৩ মাস'],
        'jp_interview' => ['Employer interview', 'Interview with the Japanese employer, usually online.', 'নিয়োগকর্তার ইন্টারভিউ', 'জাপানি নিয়োগকর্তার সাথে ইন্টারভিউ, সাধারণত অনলাইনে।', '2–6 weeks', '২–৬ সপ্তাহ'],
        'jp_coe' => ['Certificate of Eligibility', 'Employer obtains your CoE from Japanese immigration.', 'সার্টিফিকেট অব এলিজিবিলিটি', 'নিয়োগকর্তা জাপানি ইমিগ্রেশন থেকে আপনার CoE নেন।', '1–3 months', '১–৩ মাস'],
        'jp_visa' => ['Visa at Embassy of Japan', 'Visa issued by the Embassy of Japan in Dhaka.', 'জাপান দূতাবাসে ভিসা', 'ঢাকার জাপান দূতাবাস ভিসা ইস্যু করে।', '1–2 weeks', '১–২ সপ্তাহ'],
        'kr_route' => ['Check your route', 'We confirm whether you fit EPS (E-9) or a skilled employer-sponsored visa (E-7).', 'আপনার পথ যাচাই', 'আপনি EPS (ই-৯) নাকি দক্ষ নিয়োগকর্তা-স্পন্সর ভিসা (ই-৭) এর উপযুক্ত, আমরা নিশ্চিত করি।', '1–3 days', '১–৩ দিন'],
        'kr_topik' => ['EPS-TOPIK test', 'Korean language test required for the E-9 route.', 'EPS-TOPIK পরীক্ষা', 'ই-৯ পথের জন্য কোরিয়ান ভাষা পরীক্ষা।', '2–6 months of study', '২–৬ মাস পড়াশোনা'],
        'kr_skills' => ['Skills & documents', 'Skills test where required; documents prepared and checked.', 'দক্ষতা ও কাগজপত্র', 'প্রয়োজনে দক্ষতা পরীক্ষা; কাগজপত্র তৈরি ও যাচাই।', '2–4 weeks', '২–৪ সপ্তাহ'],
        'kr_select' => ['Employer selection', 'A Korean employer selects you and signs the contract.', 'নিয়োগকর্তার বাছাই', 'একজন কোরিয়ান নিয়োগকর্তা আপনাকে বাছাই করে চুক্তি স্বাক্ষর করেন।', '1–4 months', '১–৪ মাস'],
        'kr_visa' => ['Visa issued', 'Visa issued after the employer’s permit is approved.', 'ভিসা', 'নিয়োগকর্তার পারমিট অনুমোদনের পর ভিসা ইস্যু হয়।', '2–4 weeks', '২–৪ সপ্তাহ'],
        'eu_interview' => ['Employer interview', 'Interview with the employer, usually online.', 'নিয়োগকর্তার ইন্টারভিউ', 'নিয়োগকর্তার সাথে ইন্টারভিউ, সাধারণত অনলাইনে।', '1–3 weeks', '১–৩ সপ্তাহ'],
        'eu_filed' => ['Work permit filed', 'The employer applies for your work permit in the destination country.', 'ওয়ার্ক পারমিটের আবেদন', 'নিয়োগকর্তা গন্তব্য দেশে আপনার ওয়ার্ক পারমিটের আবেদন করেন।', '1–2 weeks', '১–২ সপ্তাহ'],
        'eu_approved' => ['Work permit approved', 'Approval issued; timing depends on the country and quota.', 'ওয়ার্ক পারমিট অনুমোদন', 'অনুমোদন ইস্যু হয়; সময় দেশ ও কোটার উপর নির্ভর করে।', '1–4 months', '১–৪ মাস'],
        'eu_embassy' => ['Embassy & national visa', 'Appointment and D-type visa. The embassy may be outside Bangladesh (e.g. New Delhi).', 'দূতাবাস ও ন্যাশনাল ভিসা', 'অ্যাপয়েন্টমেন্ট ও ডি-টাইপ ভিসা। দূতাবাস বাংলাদেশের বাইরে হতে পারে (যেমন নয়াদিল্লি)।', '3–8 weeks', '৩–৮ সপ্তাহ'],
        'bmet' => ['BMET clearance & smart card', 'Government emigration clearance and your BMET smart card.', 'বিএমইটি ক্লিয়ারেন্স ও স্মার্ট কার্ড', 'সরকারি বহির্গমন ছাড়পত্র ও আপনার বিএমইটি স্মার্ট কার্ড।', '3–7 days', '৩–৭ দিন'],
        'briefing' => ['Briefing & flight', 'Pre-departure briefing, contract explained in your language, ticket booked.', 'ব্রিফিং ও ফ্লাইট', 'যাত্রার আগে ব্রিফিং, আপনার ভাষায় চুক্তি বুঝিয়ে দেওয়া, টিকিট বুকিং।', '1–2 weeks', '১–২ সপ্তাহ'],
        'gcc_arrival' => ['Arrival & residence ID', 'Local medical and residence ID after you arrive. We stay in touch.', 'পৌঁছানো ও রেসিডেন্স আইডি', 'পৌঁছানোর পর স্থানীয় মেডিকেল ও রেসিডেন্স আইডি। আমরা যোগাযোগ রাখি।', 'First month', 'প্রথম মাস'],
        'qatar_arrival' => ['Arrival & QID', 'Residence permit (QID) issued in Qatar. We stay in touch.', 'পৌঁছানো ও কিউআইডি', 'কাতারে রেসিডেন্স পারমিট (কিউআইডি) ইস্যু হয়। আমরা যোগাযোগ রাখি।', 'First month', 'প্রথম মাস'],
        'sg_arrival' => ['Arrival & Work Permit card', 'Work Permit card issued after arrival. We stay in touch.', 'পৌঁছানো ও ওয়ার্ক পারমিট কার্ড', 'পৌঁছানোর পর ওয়ার্ক পারমিট কার্ড ইস্যু হয়। আমরা যোগাযোগ রাখি।', 'First weeks', 'প্রথম কয়েক সপ্তাহ'],
        'my_arrival' => ['Arrival & PLKS', 'FOMEMA medical and work pass issued in Malaysia. We stay in touch.', 'পৌঁছানো ও PLKS', 'মালয়েশিয়ায় FOMEMA মেডিকেল ও ওয়ার্ক পাস ইস্যু হয়। আমরা যোগাযোগ রাখি।', 'First month', 'প্রথম মাস'],
        'eu_arrival' => ['Arrival & residence card', 'Residence card issued after arrival. We stay in touch.', 'পৌঁছানো ও রেসিডেন্স কার্ড', 'পৌঁছানোর পর রেসিডেন্স কার্ড ইস্যু হয়। আমরা যোগাযোগ রাখি।', 'First 1–2 months', 'প্রথম ১–২ মাস'],
    ];

    private const PROCESSES = [
        'gcc' => ['apply', 'trade_test', 'offer', 'gamca', 'gcc_visa', 'bmet', 'briefing', 'gcc_arrival'],
        'qatar' => ['apply', 'trade_test', 'offer', 'qvc', 'qatar_visa', 'bmet', 'briefing', 'qatar_arrival'],
        'singapore' => ['apply', 'sg_skills', 'interview', 'sg_ipa', 'medical', 'bmet', 'briefing', 'sg_arrival'],
        'malaysia' => ['apply', 'my_interview', 'medical', 'my_vdr', 'bmet', 'briefing', 'my_arrival'],
        'japan' => ['apply', 'jp_lang', 'jp_ssw', 'jp_interview', 'jp_coe', 'jp_visa', 'bmet', 'briefing'],
        'korea' => ['kr_route', 'kr_topik', 'kr_skills', 'kr_select', 'kr_visa', 'bmet', 'briefing'],
        'europe' => ['eu_apply', 'eu_interview', 'eu_filed', 'eu_approved', 'eu_embassy', 'bmet', 'briefing', 'eu_arrival'],
    ];

    public static function steps(string $process, string $locale = 'en'): array
    {
        $o = $locale === 'bn' ? 2 : 0;

        return array_map(
            fn ($id) => ['title' => self::STEPS[$id][$o], 'body' => self::STEPS[$id][$o + 1], 'time' => self::STEPS[$id][$locale === 'bn' ? 5 : 4]],
            self::PROCESSES[$process] ?? self::PROCESSES['europe'],
        );
    }

    /** 45 → ৪৫ for Bangla prose (CLAUDE.md §6.4); forms and IDs keep Latin digits. */
    public static function bnDigits(string|int $s): string
    {
        return strtr((string) $s, ['0' => '০', '1' => '১', '2' => '২', '3' => '৩', '4' => '৪', '5' => '৫', '6' => '৬', '7' => '৭', '8' => '৮', '9' => '৯']);
    }

    public function run(): void
    {
        $industries = collect(require database_path('data/industries.php'))->keyBy('slug');
        $industriesBn = require database_path('data/industries.bn.php');
        $bnAll = require database_path('data/countries.bn.php');

        foreach (require database_path('data/countries.php') as $i => $c) {
            [$min, $max] = $c['days'];
            $bn = $bnAll[$c['slug']] ?? [];
            $sectorNames = array_map(fn ($s) => $industries[$s[0]]['short'] ?? $industries[$s[0]]['name'], $c['sectors']);
            $sectorNamesBn = array_map(fn ($s) => $industriesBn[$s[0]]['short'] ?? $industriesBn[$s[0]]['name'] ?? $s[0], $c['sectors']);
            [$bMin, $bMax, $bCon] = [self::bnDigits($min), self::bnDigits($max), self::bnDigits($c['contract'])];
            $nameBn = $bn['name'] ?? $c['name'];
            $visaBn = $bn['visa'] ?? $c['visa'];

            Country::updateOrCreate(['slug' => $c['slug']], [
                'name_en' => $c['name'],
                'name_bn' => $bn['name'] ?? null,
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
                'intro_bn' => $bn['intro'] ?? null,
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
                'meta_description_en' => Str::limit(
                    "Work in {$c['name']} from Bangladesh: {$c['visa']}, typical {$min}–{$max} days. ".
                    'Jobs in '.strtolower(implode(', ', array_slice($sectorNames, 0, 2))).'. Licensed recruiter.', 158),
                'i18n' => $bn ? ['bn' => [
                    'name' => $nameBn,
                    'visa_type' => $visaBn,
                    'languages' => $bn['languages'] ?? null,
                    'intro' => $bn['intro'] ?? null,
                    'notice' => $bn['notice'] ?? null,
                    'sector_notes' => $bn['sector_notes'] ?? [],
                    'top_trades' => $sectorNamesBn,
                    'steps' => self::steps($c['process'], 'bn'),
                    'requirements' => [...self::BASE_DOCS_BN, ...($bn['extra_docs'] ?? [])],
                    'faqs' => [
                        // Country names take different case endings in Bangla (আরব→আরবের, জাপান→জাপানের); the
                        // "{name}:" pattern avoids attaching any ending, so it is always grammatical.
                        ['q' => "{$nameBn}: বাংলাদেশ থেকে ওয়ার্ক ভিসায় কত সময় লাগে?",
                            'a' => "সম্পূর্ণ ফাইল জমা দেওয়ার পর সাধারণত {$bMin}–{$bMax} দিন, নিয়োগকর্তা ও পেশা অনুযায়ী। আপনার কেসের সময়সূচি উপদেষ্টা জানাবেন।"],
                        ['q' => "{$nameBn}: কাজ করতে কোন ভিসা লাগে?",
                            'a' => "বেশিরভাগ কর্মী যান {$visaBn} নিয়ে। নিয়োগকর্তা স্পন্সর করেন; আমরা আপনার কাগজপত্র তৈরি ও যাচাই করি।"],
                        ['q' => "{$nameBn}: চুক্তি সাধারণত কত দিনের?",
                            'a' => "সাধারণত প্রায় {$bCon} মাস, প্রায়ই নবায়নযোগ্য। সঠিক মেয়াদ স্বাক্ষরের আগে চুক্তিতে লেখা থাকে।"],
                        ['q' => 'আবেদন করতে কি কোনো টাকা লাগে?',
                            'a' => 'না। আবেদন ও শর্টলিস্ট হওয়া বিনামূল্যে। কোনো খরচ থাকলে টাকা দেওয়ার আগে লিখিতভাবে জানানো হয়।'],
                    ],
                    'meta_description' => Str::limit(
                        "{$nameBn} — বাংলাদেশ থেকে কাজ: {$visaBn}, সাধারণত {$bMin}–{$bMax} দিন। ".
                        implode(', ', array_slice($sectorNamesBn, 0, 2)).' খাতে চাকরি। লাইসেন্সপ্রাপ্ত রিক্রুটার।', 158),
                ]] : null,
                'is_active' => true,
                'sort' => $i,
            ]);
        }
    }
}
