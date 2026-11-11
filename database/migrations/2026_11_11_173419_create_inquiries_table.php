<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['job', 'employer', 'other']);
            $table->string('name', 100);
            $table->string('email', 150);
            $table->string('phone', 30)->nullable();
            $table->string('company', 120)->nullable();
            $table->text('message');
            $table->string('page', 255)->nullable();     // where it was sent from
            $table->ipAddress('ip')->nullable();
            $table->timestamp('mailed_at')->nullable();  // null = email failed; row is the source of truth
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
