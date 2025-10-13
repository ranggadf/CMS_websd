<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ekskul extends Model
{
    use HasFactory;
    protected $table = 'ekstrakulikuler';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'judul',
        'deskripsi',
        'Gambar'
    ];
}