<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    protected $table = 'ref_survey';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
    public function pilihanSurvey()
    {
        return $this->hasMany(PilihanSurvey::class, 'Kode', 'Kode');
    }
}
