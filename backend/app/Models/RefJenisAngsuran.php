<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefJenisAngsuran extends Model
{
    use HasFactory;
    protected $table = 'ref_jenis_angsuran';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
}
