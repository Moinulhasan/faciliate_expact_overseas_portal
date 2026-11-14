<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// UX audit (13 Nov 2026): many workers don't use email → phone/WhatsApp required, email optional;
// add country + trade of interest and explicit consent.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('email', 150)->nullable()->change();
            $table->string('country', 60)->nullable()->after('company');   // country slug
            $table->string('trade', 60)->nullable()->after('country');     // industry slug
            $table->string('locale', 5)->default('en')->after('page');
            $table->timestamp('consent_at')->nullable()->after('ip');
        });
    }

    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn(['country', 'trade', 'locale', 'consent_at']);
        });
    }
};
