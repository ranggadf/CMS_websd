<?php

namespace App\Http\Controllers;

use App\Models\Pemohon;
use App\Models\Produk;
use App\Models\RefProfesiSampingan;
use App\Models\RefStatusTempatTinggal;
use App\Models\RefStatusUsaha;
use App\Models\RegisterNasabah;
use App\Models\SektorEkonomi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PemohonController extends Controller
{
    public function tambahSektorEkonomi(Request $request)
    {
        $sektorEkonomi = new SektorEkonomi;
        $kodeTerakhir = SektorEkonomi::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int)substr($kodeTerakhir, 2) + 1 : 1;
        $sektorEkonomi->Kode = sprintf('SE%07d', $nomorBaru);
        $sektorEkonomi->Keterangan = $request->input('Keterangan');
        $sektorEkonomi->save();
        
        return response()->json($sektorEkonomi);
    }
    public function getSektorEkonomi()
    {
        $sektorEkonomi = SektorEkonomi::all();
        return response()->json($sektorEkonomi);
    }
    public function updateSektorEkonomi(Request $request, string $Kode)
    {
        $sektorEkonomi = SektorEkonomi::where('Kode', $Kode)->firstOrFail();
        $sektorEkonomi->update($request->all());
        return response()->json($sektorEkonomi);
    }
    public function deleteSektorEkonomi(string $Kode)
    {
        $sektorEkonomi = SektorEkonomi::where('Kode', $Kode)->first();
        if (!$sektorEkonomi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $sektorEkonomi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
    public function tambahStatusUsaha(Request $request)
    {
        $statusUsaha = new RefStatusUsaha;
        $kodeTerakhir = RefStatusUsaha::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int)substr($kodeTerakhir, 2) + 1 : 1;
        $statusUsaha->Kode = sprintf('SU%07d', $nomorBaru);
        $statusUsaha->Keterangan = $request->input('Keterangan');
        $statusUsaha->save();
        
        return response()->json($statusUsaha);
    }
    public function getStatusUsaha()
    {
        $statusUsaha = RefStatusUsaha::all();
        return response()->json($statusUsaha);
    }
    public function updateStatusUsaha(Request $request, string $Kode)
    {
        $statusUsaha = RefStatusUsaha::where('Kode', $Kode)->firstOrFail();
        $statusUsaha->update($request->all());
        return response()->json($statusUsaha);
    }
    public function deleteStatusUsaha(string $Kode)
    {
        $statusUsaha = RefStatusUsaha::where('Kode', $Kode)->first();
        if (!$statusUsaha) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $statusUsaha->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
    public function tambahStatusTempatTinggal(Request $request)
    {
        $statusTempatTinggal = new RefStatusTempatTinggal;
        $kodeTerakhir = RefStatusTempatTinggal::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int)substr($kodeTerakhir, 2) + 1 : 1;
        $statusTempatTinggal->Kode = sprintf('ST%07d', $nomorBaru);
        $statusTempatTinggal->Keterangan = $request->input('Keterangan');
        $statusTempatTinggal->save();
        
        return response()->json($statusTempatTinggal);
    }
    public function getStatusTempatTinggal()
    {
        $statusTempatTinggal = RefStatusTempatTinggal::all();
        return response()->json($statusTempatTinggal);
    }
    public function updateStatusTempatTinggal(Request $request, string $Kode)
    {
        $statusTempatTinggal = RefStatusTempatTinggal::where('Kode', $Kode)->firstOrFail();
        $statusTempatTinggal->update($request->all());
        return response()->json($statusTempatTinggal);
    }
    public function deleteStatusTempatTinggal(string $Kode)
    {
        $statusTempatTinggal = RefStatusTempatTinggal::where('Kode', $Kode)->first();
        if (!$statusTempatTinggal) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $statusTempatTinggal->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
    
    public function tambahProfesiSampingan(Request $request)
    {
        $profesiSampingan = new RefProfesiSampingan;
        $kodeTerakhir = RefProfesiSampingan::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int)substr($kodeTerakhir, 2) + 1 : 1;
        $profesiSampingan->Kode = sprintf('PS%07d', $nomorBaru);
        $profesiSampingan->Keterangan = $request->input('Keterangan');
        $profesiSampingan->save();
        
        return response()->json($profesiSampingan);
    }
    public function getProfesiSampingan()
    {
        $profesiSampingan = RefProfesiSampingan::all();
        return response()->json($profesiSampingan);
    }
    public function updateProfesiSampingan(Request $request, string $Kode)
    {
        $profesiSampingan = RefProfesiSampingan::where('Kode', $Kode)->firstOrFail();
        $profesiSampingan->update($request->all());
        return response()->json($profesiSampingan);
    }
    public function deleteProfesiSampingan(string $Kode)
    {
        $profesiSampingan = RefProfesiSampingan::where('Kode', $Kode)->first();
        if (!$profesiSampingan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $profesiSampingan->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

    function pemohon(Request $req)
    {
        $pemohon = new Pemohon;
        $pemohon->Cif = $req->input('Cif');
        $pemohon->TempatLahir = $req->input('TempatLahir');
        $pemohon->Kelamin = $req->input('Kelamin');
        $pemohon->StatusPerkawinan = $req->input('StatusPerkawinan');
        $pemohon->KTP = $req->input('KTP');
        $pemohon->profesi_sampingan = $req->input('profesi_sampingan');
        $pemohon->Nama = $req->input('Nama');
        $pemohon->TglLahir = $req->input('TglLahir');
        $pemohon->nama_ibu_kandung = $req->input('nama_ibu_kandung');
        $pemohon->jumlah_tanggungan = $req->input('jumlah_tanggungan');
        $pemohon->ktp_berlaku = $req->input('ktp_berlaku');
        $pemohon->no_hp = $req->input('no_hp');
        $pemohon->Alamat = $req->input('Alamat');
        $pemohon->kode_pos = $req->input('kode_pos');
        $pemohon->provinsi = $req->input('provinsi');
        $pemohon->kecamatan = $req->input('kecamatan');
        $pemohon->telepon = $req->input('telepon');
        $pemohon->status_tempat_tinggal = $req->input('status_tempat_tinggal');
        $pemohon->kota = $req->input('kota');
        $pemohon->kelurahan = $req->input('kelurahan');
        $pemohon->fax = $req->input('fax');
        $pemohon->lama_tinggal = $req->input('lama_tinggal');
        $pemohon->nama_usaha = $req->input('nama_usaha');
        $pemohon->tanggal_mulai_usaha = $req->input('tanggal_mulai_usaha');
        $pemohon->status_tempat_usaha = $req->input('status_tempat_usaha');
        $pemohon->surat_keterangan_usaha = $req->input('surat_keterangan_usaha');
        $pemohon->jumlah_karyawan = $req->input('jumlah_karyawan');
        $pemohon->jarak_lokasi_usaha = $req->input('jarak_lokasi_usaha');
        $pemohon->masa_laku = $req->input('masa_laku');
        $pemohon->alamat_usaha = $req->input('alamat_usaha');
        $pemohon->kode_pos_usaha = $req->input('kode_pos_usaha');
        $pemohon->provinsi_usaha = $req->input('provinsi_usaha');
        $pemohon->kecamatan_usaha = $req->input('kecamatan_usaha');
        $pemohon->kota_usaha = $req->input('kota_usaha');
        $pemohon->kelurahan_usaha = $req->input('kelurahan_usaha');
        $pemohon->foto_ktp = $req->input('foto_ktp');
        $pemohon->save();
        return $pemohon;
    }

    public function show($cif)
    {
        $nasabah = RegisterNasabah::where('Kode', $cif)->first();

        if (!$nasabah) {
            return response()->json(['message' => 'Nasabah not found'], 404);
        }

        return response()->json($nasabah);
    }
    public function index()
    {
        $data = Pemohon::with(["Produk.LimaC","Produk.Financial","Produk.aspekForm","Produk.jaminan","Produk.survey","RefProfesiSampingan","RefStatusTempatTinggal","RefStatusUsaha"])
        ->get();
        return response()->json($data);
    }

    public function getPemohonById(string $id)
    {
        $pemohon = Pemohon::findOrFail($id);
        return response()->json($pemohon);
    }
    public function getPemohonByCif(string $cif)
    {
        $pemohon = Pemohon::with([
            'Produk.LimaC', 
            'Produk.Financial', 
            'Produk.aspekForm', 
            'Produk.jaminan' => function ($query) {
                $query->with([
                    'RefJenisAgunan', 
                ]);
            }, 
            'Produk.survey' => function ($query) {
                $query->leftJoin('ref_survey', 'trx_survey.Kode', '=', 'ref_survey.Kode')
                      ->select('ref_survey.*', 'trx_survey.*');
            }, 
            'RefProfesiSampingan', 
            'RefStatusTempatTinggal', 
            'RefStatusUsaha', 
            'Produk.RefSifatKredit', 
            'Produk.RefJenisPermohonan', 
            'Produk.RefJenisAngsuran', 
            'Produk.RefBidangUsaha', 
            'Produk.aspekForm' => function ($query) {
                $query->leftJoin('aspek_form', 'trx_aspek_form.Kode', '=', 'aspek_form.Kode');
            }
        ])->where('Cif', $cif)->firstOrFail();
        return response()->json($pemohon);
    }
    public function update(Request $request, string $cif)
    {
        $pemohon = Pemohon::where('Cif', $cif)->firstOrFail();

        $validatedData = $request->validate([
            'Cif' => 'required|numeric',
            'TempatLahir' => 'required|string',
            'Kelamin' => 'required|string',
            'StatusPerkawinan' => 'required|string',
            'KTP' => 'required|string',
            'profesi_sampingan' => 'required|string',
            'Nama' => 'required|string',
            'TglLahir' => 'required|date',
            'nama_ibu_kandung' => 'required|string',
            'jumlah_tanggungan' => 'required|numeric',
            'ktp_berlaku' => 'required|date',
            'no_hp' => 'required|string',
            'Alamat' => 'required|string',
            'kode_pos' => 'required|numeric',
            'provinsi' => 'required|string',
            'kecamatan' => 'required|string',
            'telepon' => 'required|string',
            'status_tempat_tinggal' => 'required|string',
            'kota' => 'required|string',
            'kelurahan' => 'required|string',
            'fax' => 'required|string',
            'lama_tinggal' => 'required|numeric',
            'nama_usaha' => 'required|string',
            'tanggal_mulai_usaha' => 'required|date',
            'status_tempat_usaha' => 'required|string',
            'surat_keterangan_usaha' => 'required|string',
            'jumlah_karyawan' => 'required|numeric',
            'jarak_lokasi_usaha' => 'required|string',
            'masa_laku' => 'required|date',
            'alamat_usaha' => 'required|string',
            'kode_pos_usaha' => 'required|numeric',
            'provinsi_usaha' => 'required|string',
            'kecamatan_usaha' => 'required|string',
            'kota_usaha' => 'required|string',
            'kelurahan_usaha' => 'required|string',
            'foto_ktp' => 'required|string',
        ]);

        $pemohon->update($validatedData);

        return response()->json($pemohon);
    }
    public function destroy(string $Cif)
    {
        $pemohon = Pemohon::where('Cif', $Cif)->firstOrFail();
        $pemohon->delete();

        return response()->json(null, 204);
    }

    public function checkCif($cif)
    {
        $pemohon = Pemohon::where('Cif', $cif)->first();
        return response()->json(['exists' => !!$pemohon]);
    }
}
