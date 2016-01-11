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
            $table->integer('platform_type');
            $table->string('pass_code');
            $table->string('device_mac_lan')->unique();
            $table->string('device_mac_wifi')->unique();
            $table->string('device_mac_bluetooth')->unique();
            $table->string('device_mac_roaming')->unique();
            $table->boolean('antivirus_install');
            $table->datetime('last_activity');
            $table->integer('device_status');
            $table->integer('device_status_update_info');
            $table->integer('device_manufacturer_id');
            $table->longText('device_description');
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
