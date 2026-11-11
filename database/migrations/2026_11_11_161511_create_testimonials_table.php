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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['worker', 'employer']);
            $table->string('name');
            $table->string('role_en');                 // trade ("Welder") or job title at company
            $table->string('role_bn')->nullable();
            $table->string('company')->nullable();     // employers only
            $table->foreignId('country_id')->nullable()->constrained()->nullOnDelete();
            $table->text('quote_en');
            $table->text('quote_bn')->nullable();
            $table->unsignedTinyInteger('rating')->nullable();
            $table->string('photo')->nullable();
            $table->timestamp('consent_at')->nullable(); // written consent to publish (CLAUDE.md §13)
            $table->boolean('is_published')->default(false);
            $table->boolean('is_sample')->default(false);
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
