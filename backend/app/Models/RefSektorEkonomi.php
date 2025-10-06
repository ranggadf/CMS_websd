<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefSektorEkonomi extends Model
{
    use HasFactory;
    protected $table = 'ref_sektor_ekonomi';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
}
