<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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

    public function down(): void
    {
        Schema::dropIfExists('site_contents');
    }
};
