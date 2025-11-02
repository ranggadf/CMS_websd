<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migration.
     */
    public function up(): void
    {
       Schema::create('visimisi', function (Blueprint $table) {
            $table->id();
            $table->json('visi')->nullable();
            $table->json('misi')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Balikkan migration (rollback).
     */
    public function down(): void
    {
        Schema::dropIfExists('gurus');
    }
};
