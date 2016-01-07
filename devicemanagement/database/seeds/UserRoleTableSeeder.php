<?php

use Illuminate\Database\Seeder;
use Bican\Roles\Models\Role;
use Bican\Roles\Models\Permission;
use App\User;
use Hash;

class UserRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => '', // optional
            'level' => 1, // optional, set to 1 by default
        ]);

        $userAdmin = User::create([
            'staff_code' => 'IVC00001',
            'full_name' => 'Nguyen Tai Hanh',
            'email' => 'nthanh@vn.isb.co.jp',
            'password' => Hash::make('12345678'),
            'phone_number' => '01676460626',
            'user_status' => 'Working',
        ]);

        //attached role
        $userAdmin->attachRole($adminRole);
    }
}
