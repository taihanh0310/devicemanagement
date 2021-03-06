<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('employee_code', 10)->unique();
            $table->string('full_name')->nullable();
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->integer('section_id')->nullable();
            $table->boolean('active')->default(0);
            $table->string('confirmation_code')->nullable();
            $table->string('phone_number', 15)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
