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
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->integer('stunden5')->nullable();
            $table->integer('tag1')->nullable();
            $table->integer('wochenende')->nullable();
            $table->integer('wochen1')->nullable();
            $table->integer('wochen2')->nullable();
            $table->integer('wochen3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
