<?php

namespace App\Http\Controllers;

use App\Models\GolonganKredit;
use App\Models\RefBidangUsaha;
use App\Models\RefJenisAngsuran;
use App\Models\RefJenisPermohonan;
use App\Models\SifatKredit;
use Illuminate\Http\Request;

class PengajuanKreditController extends Controller
{
    public function getGolonganKredit()
    {
        $data = GolonganKredit::all();
        return response()->json($data);
    }
    public function tambahBidangUsaha(Request $request)
    {
        $bidangUsaha = new RefBidangUsaha;
        $kodeTerakhir = RefBidangUsaha::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $bidangUsaha->Kode = sprintf('BU%07d', $nomorBaru);
        $bidangUsaha->Keterangan = $request->input('Keterangan');
        $bidangUsaha->save();

        return response()->json($bidangUsaha);
    }

    public function getBidangUsaha()
    {
        $bidangUsaha = RefBidangUsaha::all();
        return response()->json($bidangUsaha);
    }

    public function updateBidangUsaha(Request $request, string $id)
    {
        $bidangUsaha = RefBidangUsaha::where('Kode', $id)->firstOrFail();
        $bidangUsaha->update($request->all());
        return response()->json($bidangUsaha);
    }

    public function deleteBidangUsaha($id)
    {
        $bidangUsaha = RefBidangUsaha::where('Kode', $id)->first();
        if (!$bidangUsaha) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $bidangUsaha->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

    public function tambahSifatKredit(Request $request)
    {
        $sifatKredit = new SifatKredit;
        $kodeTerakhir = SifatKredit::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $sifatKredit->Kode = sprintf('SK%07d', $nomorBaru);
        $sifatKredit->Keterangan = $request->input('Keterangan');
        $sifatKredit->save();

        return response()->json($sifatKredit);
    }
    public function getSifatKredit()
    {
        $sifatKredit = SifatKredit::all();
        return response()->json($sifatKredit);
    }
    public function updateSifatKredit(Request $request, string $id)
    {
        $sifatKredit = SifatKredit::where('Kode', $id)->firstOrFail();
        $sifatKredit->update($request->all());
        return response()->json($sifatKredit);
    }
    public function deleteSifatKredit($id)
    {
        $sifatKredit = SifatKredit::where('Kode', $id)->first();
        if (!$sifatKredit) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $sifatKredit->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
    
    public function tambahJenisAngsuran(Request $request)
    {
        $jenisAngsuran = new RefJenisAngsuran;
        $kodeTerakhir = RefJenisAngsuran::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $jenisAngsuran->Kode = sprintf('JA%07d', $nomorBaru);
        $jenisAngsuran->Keterangan = $request->input('Keterangan');
        $jenisAngsuran->save();

        return response()->json($jenisAngsuran);
    }
    public function getJenisAngsuran()
    {
        $jenisAngsuran = RefJenisAngsuran::all();
        return response()->json($jenisAngsuran);
    }
    public function updateJenisAngsuran(Request $request, string $id)
    {
        $jenisAngsuran = RefJenisAngsuran::where('Kode', $id)->firstOrFail();
        $jenisAngsuran->update($request->all());
        return response()->json($jenisAngsuran);
    }
    public function deleteJenisAngsuran($id)
    {
        $jenisAngsuran = RefJenisAngsuran::where('Kode', $id)->first();
        if (!$jenisAngsuran) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $jenisAngsuran->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

    public function tambahJenisPermohonan(Request $request)
    {
        $jenisPermohonan = new RefJenisPermohonan;
        $kodeTerakhir = RefJenisPermohonan::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $jenisPermohonan->Kode = sprintf('JP%07d', $nomorBaru);
        $jenisPermohonan->Keterangan = $request->input('Keterangan');
        $jenisPermohonan->save();

        return response()->json($jenisPermohonan);
    }
    public function getJenisPermohonan()
    {
        $jenisPermohonan = RefJenisPermohonan::all();
        return response()->json($jenisPermohonan);
    }
    public function updateJenisPermohonan(Request $request, string $id)
    {
        $jenisPermohonan = RefJenisPermohonan::where('Kode', $id)->firstOrFail();
        $jenisPermohonan->update($request->all());
        return response()->json($jenisPermohonan);
    }
    public function deleteJenisPermohonan($id)
    {
        $jenisPermohonan = RefJenisPermohonan::where('Kode', $id)->first();
        if (!$jenisPermohonan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $jenisPermohonan->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
