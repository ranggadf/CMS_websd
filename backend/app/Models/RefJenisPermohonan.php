<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefJenisPermohonan extends Model
{
    use HasFactory;
    protected $table = 'ref_jenis_permohonan';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
}
