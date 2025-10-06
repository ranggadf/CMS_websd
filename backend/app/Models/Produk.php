<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $table = 'produk';
    public $timestamps = false;
    protected $fillable = [
        'no_pengajuan',
        'Cif',
        'pengajuan',
        'sektor_ekonomi',
        'bidang_usaha',
        'NomorRekening',
        'plafon_kredit',
        'tanggal_aplikasi',
        'suku_bunga',
        'tanggal_permohonan',
        'jangka_waktu',
        'sifat_kredit',
        'jenis_permohonan',
        'jenis_angsuran',
        'no_aplikasi_sebelumnya',
        'tujuan_penggunaan',
        'detail_tujuan_penggunaan',
        'status'
    ];

    protected $casts = [
        'tanggal_aplikasi' => 'date',
        'tanggal_permohonan' => 'date',
    ];
    public function financial()
    {
        return $this->hasOne(Finansial::class, 'no_pengajuan', 'no_pengajuan');
    }

    public function survey()
    {
        return $this->hasMany(OutSurvey::class, 'no_pengajuan', 'no_pengajuan');
    }
    public function LimaC()
    {
        return $this->hasOne(LimaC::class, 'no_pengajuan', 'no_pengajuan');
    }

    public function aspekForm()
    {
        return $this->hasMany(OutAspekForm::class, 'no_pengajuan', 'no_pengajuan');
    }

    public function jaminan()
    {
        return $this->hasMany(Jaminan::class, 'no_pengajuan', 'no_pengajuan');
    }



    public function RefBidangUsaha()
    {
        return $this->belongsTo(RefBidangUsaha::class, 'bidang_usaha', 'Kode');
    }

    public function RefSektorEkonomi()
    {
        return $this->belongsTo(RefSektorEkonomi::class, 'sektor_ekonomi', 'Kode');
    }

    public function RefSifatKredit()
    {
        return $this->belongsTo(SifatKredit::class, 'sifat_kredit', 'Kode');
    }

    public function RefJenisPermohonan()
    {
        return $this->belongsTo(RefJenisPermohonan::class, 'jenis_permohonan', 'Kode');
    }

    public function RefJenisAngsuran()
    {
        return $this->belongsTo(RefJenisAngsuran::class, 'jenis_angsuran', 'Kode');
    }
}
