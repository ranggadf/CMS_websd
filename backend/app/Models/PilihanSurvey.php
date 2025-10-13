<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PilihanSurvey extends Model
{
    use HasFactory;
    protected $table = 'pilihan_survey';
    public $timestamps = false;
    protected $fillable = [
        'Kode',
        'pertanyaan',
    ];
}
