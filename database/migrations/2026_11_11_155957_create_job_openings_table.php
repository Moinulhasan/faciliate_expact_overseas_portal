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
        Schema::create('job_openings', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->foreignId('country_id')->constrained()->cascadeOnDelete();
            $table->foreignId('industry_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title_en');
            $table->string('title_bn')->nullable();
            $table->unsignedInteger('salary_min');
            $table->unsignedInteger('salary_max');
            $table->char('currency', 3);
            $table->unsignedInteger('salary_bdt_min')->nullable();
            $table->unsignedSmallInteger('contract_months');
            $table->enum('gender', ['any', 'male', 'female'])->default('any');
            $table->date('deadline')->nullable();
            $table->enum('status', ['open', 'closing', 'filled'])->default('open');
            $table->text('description_en')->nullable();
            $table->text('description_bn')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_openings');
    }
};
