<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AspekForm extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'aspek_form';
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan'
    ];

    public function jawabanAspek()
    {
        return $this->hasMany(OutAspekForm::class, 'Kode', 'Kode');
    }
}
