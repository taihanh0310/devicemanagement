<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
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

    /**
     * Get the post that owns the comment.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    /**
     * End relationships
     */
}
