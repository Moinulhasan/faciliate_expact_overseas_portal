<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // No JobOpening seeder on purpose: jobs must be real (added via admin in phase 3/8).
        $this->call([IndustrySeeder::class, CountrySeeder::class]);

        if (\App\Models\JobOpening::samplesAllowed()) {
            $this->call([SampleTestimonialSeeder::class, SampleJobSeeder::class]);
        }
    }
}
