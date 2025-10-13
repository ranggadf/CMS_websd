<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GolonganKredit extends Model
{
    use HasFactory;
    protected $table = 'golongankredit';
    protected $connection = 'real_los'; 
}
