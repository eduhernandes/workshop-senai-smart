<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{

    protected $fillable = ['name', 'block', 'capacity', 'has_projector'];

}
