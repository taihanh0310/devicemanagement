<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'devices';
    
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
