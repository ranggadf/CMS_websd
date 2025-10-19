<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'gurus';

    // Kolom yang bisa diisi (mass assignable)
    protected $fillable = [
        'kategori',
        'nama',
        'jabatan',
        'gambar',
    ];

    // Agar created_at & updated_at otomatis dikelola Laravel
    public $timestamps = true;
}