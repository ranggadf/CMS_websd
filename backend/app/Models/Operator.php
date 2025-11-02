<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Operator.php
class Operator extends Model
{
    use HasFactory;

    protected $table = 'users';
    public $timestamps = false;

    protected $fillable = [
        'name','email','password','phone','address','status','sidebars',
    ];

    protected $hidden = [
        'password',
    ];

    // tambah ini:
    protected $casts = [
        'sidebars' => 'array',
    ];
}

