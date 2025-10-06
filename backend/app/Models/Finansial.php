<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finansial extends Model
{
    use HasFactory;
    protected $table = 'trx_finansials';
    public $timestamps = false;
    protected $fillable = [
        'no_pengajuan',
        'oms_ramai',
        'oms_normal',
        'oms_sepi',
        'hrg_pokok_jual',
        'btk_tdklangsung',
        'ohc',
        'b_usahalainnya',
        'b_rumahtangga',
        'b_sekolah',
        'b_pln_pdam',
        'b_transport_komunikasi',
        'b_lain_lain',
        'p_lainnya',
        'b_Lainnya',
        'bukti_pendapatan',
        'bukti_biaya',
        'bank_nonbank',
        'koperasi',
        'lainLain',
        'angsuran_baru',
        'kas',
        'bank',
        'piutang',
        'persediaan_barang',
        'atv_lancar_lainnya',
        'sub_atv_lancar',
        'tanah_bangunan',
        'peralatan_usaha',
        'kendaraan',
        'atv_tetap_lainnya',
        'sub_atv_tetap',
        'jumlah_atv',
        'tot_bdp_jangka_pendek',
        'idr_jangka_pendek',
        'jangka_pendek',
        'tot_bdp_jangka_panjang',
        'idr_jangka_panjang',
        'jangka_panjang',
        'sub_jumlah_hutang',
        'modal_sendiri',
        'laba',
        'sub_jumlah_modal',
        'jumlah_passiva'
    ];
    
}
