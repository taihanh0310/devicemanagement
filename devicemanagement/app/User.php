<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','employee_code','section_id','confirmation_code','phone_number'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','active',
    ];

    /**
     * Relationships
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    /**
     * Get the devices for the user post.
     */
    public function devices()
    {
        return $this->hasMany('App\Device');
    }
    /**
     * End relationships
     */
}
