<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

      protected $table = 'beritas';

    protected $fillable = ['judul', 'deskripsi', 'gambar'];

    public $timestamps = true; // agar created_at & updated_at otomatis
}
