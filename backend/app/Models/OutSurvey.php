<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutSurvey extends Model
{
    use HasFactory;
    protected $table = 'trx_survey';
    public $timestamps = false;
    protected $fillable = [
        'no_pengajuan',
        'Kode',
        'Pilihan',
    ];
}
