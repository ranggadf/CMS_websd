<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    // Nama tabel di database (opsional jika sesuai konvensi)
    protected $table = 'visitors';

    // Kolom yang bisa diisi (mass assignable)
    protected $fillable = [
        'ip_address',
        'user_agent',
    ];

    // (Opsional) kalau kamu ingin format tanggal otomatis jadi lokal
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
