<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SifatKredit extends Model
{
    use HasFactory;
    protected $table = 'ref_sifat_kredit';
    protected $connection = 'los'; 
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan'
    ];
}
