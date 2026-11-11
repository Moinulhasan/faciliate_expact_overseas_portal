<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_openings', function (Blueprint $table) {
            $table->unsignedSmallInteger('positions')->nullable()->after('title_bn');
            $table->string('employer_type_en')->nullable()->after('positions'); // e.g. "Construction contractor" — never a name without consent
            $table->string('city_en')->nullable()->after('employer_type_en');
            $table->string('working_hours_en')->nullable()->after('contract_months');
            $table->json('requirements')->nullable()->after('description_bn');
            // {accommodation, food, transport, ticket, medical, overtime}: true | false | null (null = ask)
            $table->json('benefits')->nullable()->after('requirements');
            $table->boolean('is_sample')->default(false)->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('job_openings', fn (Blueprint $t) => $t->dropColumn([
            'positions', 'employer_type_en', 'city_en', 'working_hours_en', 'requirements', 'benefits', 'is_sample',
        ]));
    }
};
