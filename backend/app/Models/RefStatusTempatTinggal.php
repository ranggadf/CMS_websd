<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefStatusTempatTinggal extends Model
{
    use HasFactory;
    protected $table = 'ref_status_tempat_tinggal';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
}
