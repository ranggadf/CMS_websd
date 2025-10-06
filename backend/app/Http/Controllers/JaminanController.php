<?php

namespace App\Http\Controllers;

use App\Models\Jaminan;
use App\Models\RefHakMilik;
use App\Models\RefHubPemilik;
use App\Models\RefJenisAgunan;
use App\Models\RefJenisPengikatan;
use App\Models\RefTipe;
use Illuminate\Http\Request;

class JaminanController extends Controller
{
    public function tambahjenisagunan(Request $request)
    {
        $jenisAgunan = new RefJenisAgunan;
        $kodeTerakhir = RefJenisAgunan::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 2) + 1 : 1;
        $jenisAgunan->Kode = sprintf('AG%07d', $nomorBaru);
        $jenisAgunan->Keterangan = $request->input('Keterangan');
        $jenisAgunan->save();

        return response()->json($jenisAgunan);
    }
    public function getjenisagunan()
    {
        $jenisAgunan = RefJenisAgunan::all();
        return response()->json($jenisAgunan);
    }
    public function updateJenisAgunan(Request $request, string $id)
    {
        $jenisAgunan = RefJenisAgunan::where('Kode', $id)->firstOrFail();
        $jenisAgunan->update($request->all());
        return response()->json($jenisAgunan);
    }
    public function deleteJenisAgunan($id)
    {
        $jenisAgunan = RefJenisAgunan::where('Kode', $id)->first();
        if (!$jenisAgunan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $jenisAgunan->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

    // public function getalljaminan()
    // {
    //     $jaminan = Jaminan::with(['RefJenisAgunan'])->get();
    //     return response()->json($jaminan);
    // }
    public function jaminan(Request $request)
    {
        $data = $request->json()->all();

        $jaminanData = [];
        foreach ($data as $item) {
            $mainForm = $item['mainForm'];
            $specificForm = $item['specificForm'];

            $jaminan = new Jaminan;
            $jaminan->no_pengajuan = $mainForm['no_pengajuan'];
            $jaminan->jenisAgunan = $mainForm['jenisAgunan'];
            $jaminan->namaPemilikJaminan = $mainForm['namaPemilikJaminan'];
            $jaminan->tanggalPembuatan = $mainForm['tanggalPembuatan'];
            $jaminan->nilaiTransaksi = $mainForm['nilaiYangDiagunkan'];
            $jaminan->nilaiPasar = $mainForm['nilaiPasar'];

            // Untuk Tabungan/Deposito
            $jaminan->jenis = $specificForm['jenis'] ?? null;
            $jaminan->noRekening = $specificForm['noRekening'] ?? null;
            $jaminan->noBilyet = $specificForm['noBilyet'] ?? null;
            $jaminan->nominal = $specificForm['nominal'] ?? null;
            
            // Untuk Perhiasan
            $jaminan->uraian = $specificForm['uraian'] ?? null;
            $jaminan->jumlah = $specificForm['jumlah'] ?? null;
            $jaminan->berat = $specificForm['berat'] ?? null;
            $jaminan->kadar = $specificForm['kadar'] ?? null;

            // Untuk Kendaraan
            $jaminan->noMesin = $specificForm['noMesin'] ?? null;
            $jaminan->jumlahRoda = $specificForm['jumlahRoda'] ?? null;
            $jaminan->merk = $specificForm['merk'] ?? null;
            $jaminan->tipe = $specificForm['tipe'] ?? null;
            $jaminan->tahun = $specificForm['tahun'] ?? null;
            $jaminan->masaPajak = $specificForm['masaPajak'] ?? null;
            $jaminan->noRangka = $specificForm['noRangka'] ?? null;
            $jaminan->noSTNK = $specificForm['noSTNK'] ?? null;
            $jaminan->noPolisi = $specificForm['noPolisi'] ?? null;
            $jaminan->noBPKB = $specificForm['noBPKB'] ?? null;
            $jaminan->noRegBPKB = $specificForm['noRegBPKB'] ?? null;
            $jaminan->silinder = $specificForm['silinder'] ?? null;
            $jaminan->warna = $specificForm['warna'] ?? null;

            // Untuk Tanah dan Bangunan
            $jaminan->noSHM = $specificForm['noSHM'] ?? null;
            $jaminan->noGS = $specificForm['noGS'] ?? null;
            $jaminan->noNIB = $specificForm['noNIB'] ?? null;
            $jaminan->jenisHakMilik = $specificForm['jenisHakMilik'] ?? null;
            $jaminan->jenisSurat = $specificForm['jenisSurat'] ?? null;
            $jaminan->luas = $specificForm['luas'] ?? null;
            $jaminan->tanggalGS = $specificForm['tanggalGS'] ?? null;
            $jaminan->kota = $specificForm['kota'] ?? null;
            $jaminan->provinsi = $specificForm['provinsi'] ?? null;
            $jaminan->keadaanJaminan = $specificForm['keadaanJaminan'] ?? null;
            $jaminan->batasUtara = $specificForm['batasUtara'] ?? null;
            $jaminan->batasTimur = $specificForm['batasTimur'] ?? null;
            $jaminan->batasSelatan = $specificForm['batasSelatan'] ?? null;
            $jaminan->batasBarat = $specificForm['batasBarat'] ?? null;

            // Data umum
            $jaminan->atasNama = $specificForm['atasNama'] ?? null;
            $jaminan->alamat = $specificForm['alamat'] ?? null;
            $jaminan->keterangan = $specificForm['keterangan'] ?? null;

            $jaminan->save();
            $jaminanData[] = $jaminan;
        }

        return response()->json($jaminanData);
    }

    public function getJaminanByNoPengajuan(string $no_pengajuan)
    {
        $jaminan = Jaminan::with(['RefJenisAgunan'])->where('no_pengajuan', $no_pengajuan)->get();
        return response()->json($jaminan);
    }

    public function update(Request $request)
    {
        $data = $request->json()->all();

        if (empty($data)) {
            return response()->json(['error' => 'Data tidak boleh kosong'], 400);
        }

        $jaminanData = [];

        foreach ($data as $item) {
            $jaminan = Jaminan::find($item['id']);

            if ($jaminan) {
                $jaminan->no_pengajuan = $item['no_pengajuan'];
                $jaminan->jenisAgunan = $item['jenisAgunan'];
                $jaminan->namaPemilikJaminan = $item['namaPemilikJaminan'];
                $jaminan->tanggalPembuatan = $item['tanggalPembuatan'];
                $jaminan->nilaiTransaksi = $item['nilaiTransaksi'];
                $jaminan->nilaiPasar = $item['nilaiPasar'];

                $jaminan->jenis = $item['jenis'];
                $jaminan->noRekening = $item['noRekening'];
                $jaminan->noBilyet = $item['noBilyet'];
                $jaminan->nominal = $item['nominal'];
                $jaminan->atasNama = $item['atasNama'];
                $jaminan->alamat = $item['alamat'];
                $jaminan->keterangan = $item['keterangan'];
                $jaminan->uraian = $item['uraian'];
                $jaminan->berat = $item['berat'];
                $jaminan->jumlah = $item['jumlah'];
                $jaminan->kadar = $item['kadar'];
                $jaminan->noMesin = $item['noMesin'];
                $jaminan->jumlahRoda = $item['jumlahRoda'];
                $jaminan->merk = $item['merk'];
                $jaminan->tipe = $item['tipe'];
                $jaminan->tahun = $item['tahun'];
                $jaminan->masaPajak = $item['masaPajak'];
                $jaminan->noRangka = $item['noRangka'];
                $jaminan->noSTNK = $item['noSTNK'];
                $jaminan->noPolisi = $item['noPolisi'];
                $jaminan->noBPKB = $item['noBPKB'];
                $jaminan->noRegBPKB = $item['noRegBPKB'];
                $jaminan->silinder = $item['silinder'];
                $jaminan->warna = $item['warna'];
                $jaminan->noSHM = $item['noSHM'];
                $jaminan->noGS = $item['noGS'];
                $jaminan->noNIB = $item['noNIB'];
                $jaminan->jenisHakMilik = $item['jenisHakMilik'];
                $jaminan->jenisSurat = $item['jenisSurat'];
                $jaminan->luas = $item['luas'];
                $jaminan->tanggalGS = $item['tanggalGS'];
                $jaminan->kota = $item['kota'];
                $jaminan->provinsi = $item['provinsi'];
                $jaminan->keadaanJaminan = $item['keadaanJaminan'];
                $jaminan->batasUtara = $item['batasUtara'];
                $jaminan->batasTimur = $item['batasTimur'];
                $jaminan->batasSelatan = $item['batasSelatan'];
                $jaminan->batasBarat = $item['batasBarat'];

                $jaminan->save();


                $jaminan->load('RefJenisAgunan');
                $jaminanData[] = $jaminan;
            }
        }

        return response()->json($jaminanData);
    }
    public function delete($no_pengajuan, $jenisAgunan)
    {
        try {
            $jaminan = Jaminan::where('no_pengajuan', $no_pengajuan)
                            ->where('jenisAgunan', $jenisAgunan)
                            ->first();

            if (!$jaminan) {
                return response()->json(['message' => 'Data jaminan tidak ditemukan'], 404);
            }

            $jaminan->delete();

            return response()->json(['message' => 'Data jaminan berhasil dihapus']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan saat menghapus data jaminan'], 500);
        }
    }
}
