<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LimaC extends Model
{
    use HasFactory;
    protected $table = 'trx_limacs';
    public $timestamps = false;
    protected $fillable = [
        'no_pengajuan',
        'characters',
        'capacity',
        'capital',
        'collateral',
        'conditions',
    ];
}
