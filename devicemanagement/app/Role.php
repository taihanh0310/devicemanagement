<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * Relationships
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }
    /**
     * End relationships
     */
}
