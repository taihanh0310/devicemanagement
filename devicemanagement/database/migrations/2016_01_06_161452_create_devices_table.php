<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->increments('id');
            $table->string('device_code', 10)->unique();
            $table->string('device_name');
            $table->string('device_model');
            $table->string('device_imei');
            $table->string('device_image');
            $table->integer('device_owner');
            $table->integer('device_type');
            $table->string('pass_code');
            $table->boolean('antivirus_install');
            $table->datetime('last_activity');
            $table->integer('device_status');
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
        Schema::drop('devices');
    }
}
