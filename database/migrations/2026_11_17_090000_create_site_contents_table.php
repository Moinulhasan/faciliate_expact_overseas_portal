<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Editable website copy, written by the ERP (shared delight_backend). Read by App\Support\SiteContent.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_contents', function (Blueprint $table) {
            $table->id();
            $table->string('site', 30);                     // 'overseas' = this website
            $table->string('key', 80);                      // see resources/content/site-content.schema.json
            $table->string('locale', 5)->default('en');     // en | bn
            $table->json('value');
            $table->string('updated_by', 150)->nullable();  // ERP user name
            $table->timestamps();
            $table->unique(['site', 'key', 'locale']);
        });
    }

    // The table is shared (other sites' rows, ERP edits): never drop it while it holds content.
    public function down(): void
    {
        if (Schema::hasTable('site_contents') && DB::table('site_contents')->exists()) {
            throw new RuntimeException('site_contents has content rows; export or delete them first');
        }
        Schema::dropIfExists('site_contents');
    }
};
