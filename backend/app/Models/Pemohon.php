<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemohon extends Model
{
    use HasFactory;
    protected $table = 'pemohon';
    protected $connection = 'los';
    public $timestamps = false;
    protected $fillable = [
        'Cif',
        'TempatLahir',
        'Kelamin',
        'StatusPerkawinan',
        'KTP',
        'profesi_sampingan',
        'Nama',
        'TglLahir',
        'nama_ibu_kandung',
        'jumlah_tanggungan',
        'ktp_berlaku',
        'no_hp',
        'Alamat',
        'kode_pos',
        'provinsi',
        'kecamatan',
        'telepon',
        'status_tempat_tinggal',
        'kota',
        'kelurahan',
        'fax',
        'lama_tinggal',
        'nama_usaha',
        'tanggal_mulai_usaha',
        'status_tempat_usaha',
        'surat_keterangan_usaha',
        'jumlah_karyawan',
        'jarak_lokasi_usaha',
        'masa_laku',
        'alamat_usaha',
        'kode_pos_usaha',
        'provinsi_usaha',
        'kecamatan_usaha',
        'kota_usaha',
        'kelurahan_usaha',
        'foto_ktp'
    ];
    public function Produk()
    {
        return $this->hasMany(Produk::class, 'Cif', 'Cif');
    }

    public function RefProfesiSampingan()
    {
        return $this->belongsTo(RefProfesiSampingan::class, 'profesi_sampingan', 'Kode');
    }

    public function RefStatusUsaha()
    {
        return $this->belongsTo(RefStatusUsaha::class, 'status_tempat_usaha', 'Kode');
    }

    public function RefStatusTempatTinggal()
    {
        return $this->belongsTo(RefStatusTempatTinggal::class, 'status_tempat_tinggal', 'Kode');
    }
}
