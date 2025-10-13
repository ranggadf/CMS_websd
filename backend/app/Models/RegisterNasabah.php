<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegisterNasabah extends Model
{
    use HasFactory;
    protected $table = 'registernasabah';
    protected $connection = 'real_los'; 
}
