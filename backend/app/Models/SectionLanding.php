<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionLanding extends Model
{
    use HasFactory;
    protected $table = 'section_landing';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'section',
        'judul',
        'deskripsi',
        'jml_siswa_laki',
        'jml_siswa_perempuan',
        'Gambar',
        'nama',
        'total_siswa'
    ];
}