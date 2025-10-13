<?php

namespace App\Http\Controllers;

use App\Models\SectionLanding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class LandingController extends Controller
{
    public function tambahLanding(Request $request)
    {
        Log::info('Data yang diterima:', $request->all());

        return DB::transaction(function () use ($request) {
            $savedData = [];

            foreach ($request->input('sections') as $index => $sectionData) {
                // Validasi field
                $validator = Validator::make($sectionData, [
                    'section'    => 'required|string',
                    'judul'      => 'nullable|string',
                    'deskripsi'  => 'nullable|string',
                    'jumlah_siswa' => 'nullable|string',
                    'jenis_kelamin'    => 'nullable|string',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }

                $data = new SectionLanding;
                $data->section    = $sectionData['section'];
                $data->judul      = $sectionData['judul']?? null;
                $data->deskripsi  = $sectionData['deskripsi'?? null];
                $data->jumlah_siswa = $sectionData['story'] ?? null;
                $data->jenis_kelamin    = $sectionData['jenis_kelamin'] ?? null;

                // Proses upload gambar
                if ($request->hasFile("sections.$index.Gambar")) {
                    $file = $request->file("sections.$index.Gambar");

                    // Validasi gambar
                    $validator = Validator::make(
                        ['image' => $file],
                        ['image' => 'image|mimes:jpg,jpeg,png,gif|max:2048']
                    );

                    if ($validator->fails()) {
                        return response()->json(['errors' => $validator->errors()], 422);
                    }

                    // Simpan gambar
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $file->move(public_path('images'), $filename);

                    // Simpan path ke kolom "Gambar"
                    $data->Gambar = 'images/' . $filename;
                }

                $data->save();
                $savedData[] = $data;
            }

            return response()->json([
                'message' => 'Berhasil simpan semua section FAQ',
                'data'    => $savedData
            ]);
        });
    }

    public function getLanding()
    {
        return response()->json(SectionLanding::all());
    }

    public function getLandingById($id)
    {
        $data = SectionLanding::find($id);

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($data);
    }

    public function updateLanding(Request $request, string $id)
{
    try {
        Log::info('Masuk ke updateSectionFaq');
        Log::info('Request all:', $request->all());
        Log::info('File Gambar:', [$request->file('Gambar')]);

        $data = SectionLanding::findOrFail($id);

        // Upload Gambar jika ada
        if ($request->hasFile('Gambar') && $request->file('Gambar')->isValid()) {
            // Hapus gambar lama jika ada
            if ($data->Gambar && File::exists(public_path($data->Gambar))) {
                File::delete(public_path($data->Gambar));
            }

            // Simpan gambar baru
            $file = $request->file('Gambar');
            $namaFile = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('/images'), $namaFile);
            $data->Gambar = '/images' . $namaFile;
        }

        // Update field-field lainnya
        $fields = ['section', 'judul', 'deskripsi', 'jumlah_siswa', 'jenis_kelamin'];
        foreach ($fields as $field) {
            if ($request->filled($field)) {
                $data->$field = $request->input($field);
            }
        }

        $data->save();

        return response()->json($data, 200);
    } catch (\Exception $e) {
        Log::error('Update SectionFaq Error:', ['message' => $e->getMessage()]);
        return response()->json(['error' => 'Gagal update: ' . $e->getMessage()], 500);
    }
}

    public function deleteLanding($id)
    {
        $data = SectionLanding::find($id);

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // Hapus gambar jika ada
        if ($data->Gambar) {
            $gambarPath = public_path($data->Gambar);
            if (file_exists($gambarPath)) {
                unlink($gambarPath);
            }
        }

        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
