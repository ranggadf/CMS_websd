<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefHakMilik extends Model
{
    use HasFactory;
    protected $table = 'ref_hak_milik';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan'
    ];
}
