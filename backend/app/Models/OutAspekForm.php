<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutAspekForm extends Model
{
    use HasFactory;
    protected $table = 'trx_aspek_form';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'jawaban',
        'no_pengajuan',
    ];
    public function aspekForm()
    {
        return $this->belongsTo(AspekForm::class, 'Kode', 'Kode');
    }
}
