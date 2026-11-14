<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// One JSON column per table for all translated fields: {"bn": {"name": "...", "roles": [...], "steps": [...]}}.
// English stays in the existing columns and is the fallback for anything not translated.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('industries', fn (Blueprint $t) => $t->json('i18n')->nullable());
        Schema::table('countries', fn (Blueprint $t) => $t->json('i18n')->nullable());
    }

    public function down(): void
    {
        Schema::table('industries', fn (Blueprint $t) => $t->dropColumn('i18n'));
        Schema::table('countries', fn (Blueprint $t) => $t->dropColumn('i18n'));
    }
};
