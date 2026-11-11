<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_bn')->nullable();
            $table->char('iso2', 2);
            $table->enum('region', ['gcc', 'east_asia', 'se_asia', 'europe']);
            $table->decimal('lat', 8, 5);
            $table->decimal('lng', 8, 5);
            $table->string('hero_image')->nullable();
            $table->unsignedSmallInteger('processing_days_min')->nullable();
            $table->unsignedSmallInteger('processing_days_max')->nullable();
            $table->unsignedSmallInteger('contract_months_typical')->nullable();
            $table->char('currency', 3)->nullable();
            $table->text('intro_en')->nullable();
            $table->text('intro_bn')->nullable();
            $table->json('requirements')->nullable();
            $table->json('steps')->nullable();
            $table->json('top_trades')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
