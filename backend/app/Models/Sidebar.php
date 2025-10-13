<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sidebar extends Model
{
    use HasFactory;

    protected $table = 'menu_sidebar';
    public $timestamps = false;
    protected $fillable = [
        'label',
        'to_path',
        'status'
    ];
    protected $casts = [
        'children' => 'array',
    ];
}