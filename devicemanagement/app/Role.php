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
    protected $table = 'roles';

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
