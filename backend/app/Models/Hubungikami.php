<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HubungiKami extends Model
{
    use HasFactory;

      protected $table = 'section_hubungi_kami';
    protected $fillable = ['judul', 'no_telp', 'email', 'alamat'];
}
