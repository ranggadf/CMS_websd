<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
    use HasFactory;
    protected $table = 'section_fasilitas';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'judul',
        'deskripsi',
        'Gambar'
    ];
}