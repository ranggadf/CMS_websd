<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefBidangUsaha extends Model
{
    use HasFactory;
    protected $table = 'ref_bidang_usaha';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan'
    ];
}
