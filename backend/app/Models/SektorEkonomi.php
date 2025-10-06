<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SektorEkonomi extends Model
{
    use HasFactory;
    protected $table = 'ref_sektor_ekonomi';
    protected $connection = 'los'; 
    public $timestamps = false;
    protected $fillable = [
        'Kode',
        'Keterangan'
    ];
}
