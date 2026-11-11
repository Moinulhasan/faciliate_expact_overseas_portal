<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('countries', function (Blueprint $table) {
            $table->string('visa_type_en')->nullable()->after('currency');
            $table->string('languages_en')->nullable()->after('visa_type_en');
            $table->text('notice_en')->nullable()->after('intro_bn');   // honest caveat, e.g. quota-dependent intake
            $table->json('sectors')->nullable()->after('steps');        // [{industry, note}]
            $table->json('faqs')->nullable()->after('sectors');         // [{q, a}]
            $table->string('meta_description_en', 300)->nullable();
        });

        Schema::table('industries', function (Blueprint $table) {
            $table->string('group')->nullable()->after('name_bn');
            $table->text('intro_en')->nullable()->after('summary_bn');
            $table->json('certifications')->nullable()->after('roles');
            $table->json('highlights')->nullable()->after('certifications'); // [{title, body}]
            $table->json('faqs')->nullable()->after('highlights');
            $table->string('meta_description_en', 300)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('countries', fn (Blueprint $t) => $t->dropColumn(['visa_type_en', 'languages_en', 'notice_en', 'sectors', 'faqs', 'meta_description_en']));
        Schema::table('industries', fn (Blueprint $t) => $t->dropColumn(['group', 'intro_en', 'certifications', 'highlights', 'faqs', 'meta_description_en']));
    }
};
