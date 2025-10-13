<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\SifatKredit;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index()
    {
        $produk = Produk::with(['financial', 'LimaC', 'aspekForm', 'jaminan', 'survey', 'RefSifatKredit', 'RefJenisPermohonan', 'RefJenisAngsuran', 'RefBidangUsaha', 'RefSektorEkonomi'])->get();
        return response()->json($produk);
    }
    function produk(Request $req)
    {
        $produk = new Produk;
        $produk->no_pengajuan = $req->input('no_pengajuan');
        $produk->Cif = $req->input('Cif');
        $produk->pengajuan = $req->input('pengajuan');
        $produk->bidang_usaha = $req->input('bidang_usaha');
        $produk->sektor_ekonomi = $req->input('sektor_ekonomi');
        $produk->NomorRekening = $req->input('NomorRekening');
        $produk->tanggal_aplikasi = $req->input('tanggal_aplikasi');
        $produk->tanggal_permohonan = $req->input('tanggal_permohonan');
        $produk->plafon_kredit = $req->input('plafon_kredit');
        $produk->suku_bunga = $req->input('suku_bunga');
        $produk->jangka_waktu = $req->input('jangka_waktu');
        $produk->sifat_kredit = $req->input('sifat_kredit');
        $produk->jenis_permohonan = $req->input('jenis_permohonan');
        $produk->jenis_angsuran = $req->input('jenis_angsuran');
        $produk->no_aplikasi_sebelumnya = $req->input('no_aplikasi_sebelumnya');
        $produk->tujuan_penggunaan = $req->input('tujuan_penggunaan');
        $produk->detail_tujuan_penggunaan = $req->input('detail_tujuan_penggunaan');
        $produk->save();
        return $produk;
    }
    public function getProdukById(string $no_pengajuan)
    {
        $produk = Produk::with(
            [
                'financial',
                'LimaC',
                'aspekForm' => function ($query) {
                    $query->leftJoin('aspek_form', 'trx_aspek_form.Kode', '=', 'aspek_form.Kode');
                },
                'jaminan' => function ($query) {
                    $query->with([
                        'RefJenisAgunan',
                    ]);
                },
                'survey' => function ($query) {
                    $query->leftJoin('ref_survey', 'trx_survey.Kode', '=', 'ref_survey.Kode')
                          ->select('ref_survey.*', 'trx_survey.*');
                },
                'RefSifatKredit',
                'RefJenisPermohonan',
                'RefJenisAngsuran',
                'RefBidangUsaha',
                'RefSektorEkonomi'
            ]
        )->where('no_pengajuan', $no_pengajuan)->firstOrFail();
        return response()->json($produk);
    }

    public function update(Request $request, string $no_pengajuan)
    {
        $produk = Produk::where('no_pengajuan', $no_pengajuan)->firstOrFail();

        $validatedData = $request->validate([
            'Cif' => 'required|numeric',
            'pengajuan' => 'required|string',
            'sektor_ekonomi' => 'required|string',
            'bidang_usaha' => 'required|string',
            'NomorRekening' => 'required|string',
            'plafon_kredit' => 'required|numeric',
            'tanggal_aplikasi' => 'required|string',
            'suku_bunga' => 'required|numeric',
            'tanggal_permohonan' => 'required|string',
            'jangka_waktu' => 'required|numeric',
            'sifat_kredit' => 'required|string',
            'jenis_permohonan' => 'required|string',
            'jenis_angsuran' => 'required|string',
            'no_aplikasi_sebelumnya' => 'required|string',
            'tujuan_penggunaan' => 'required|string',
            'detail_tujuan_penggunaan' => 'required|string',
        ]);

        $produk->update($validatedData);

        return response()->json($produk);
    }
    
    public function updateStatusPengajuan(Request $request, string $no_pengajuan)
    {
        $produk = Produk::where('no_pengajuan', $no_pengajuan)->firstOrFail();
        $produk->status = $request->input('status');
        $produk->save();
        return response()->json($produk);
    }
    public function destroy(string $NomorRekening)
    {
        $produk = Produk::where('NomorRekening', $NomorRekening)->firstOrFail();
        $produk->delete();

        return response()->json(null, 204);
    }

    public function getProdukByCif(string $cif)
    {
        $produk = Produk::with(['RefSifatKredit', 'RefJenisPermohonan', 'RefJenisAngsuran', 'RefBidangUsaha', 'RefSektorEkonomi'])->where('Cif', $cif)->get();

        if (!$produk) {
            return response()->json(['message' => 'Produk not found'], 404);
        }

        return response()->json($produk);
    }
    public function getLastPengajuan()
    {
        $lastPengajuan = Produk::orderBy('no_pengajuan', 'desc')->first();

        if ($lastPengajuan) {
            $lastNumber = substr($lastPengajuan->no_pengajuan, 2);
            $newNumber = (int) $lastNumber + 1;
            $newNoPengajuan = 'PK' . str_pad($newNumber, 7, '0', STR_PAD_LEFT);
            return $newNoPengajuan;
        } else {
            return 'PK0000001';
        }
    }
}
