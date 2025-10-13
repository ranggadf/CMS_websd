<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class FasilitasController extends Controller
{
    public function tambahFasilitas(Request $request)
    {
        Log::info('Data yang diterima:', $request->all());

        return DB::transaction(function () use ($request) {
            $savedData = [];

            foreach ($request->input('sections') as $index => $sectionData) {
                // Validasi field
                $validator = Validator::make($sectionData, [
                  
                    'judul'      => 'nullable|string',
                    'deskripsi'  => 'nullable|string',
                   
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }

                $data = new Fasilitas;
               
                $data->judul      = $sectionData['judul']?? null;
                $data->deskripsi  = $sectionData['deskripsi'?? null];
          

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

    public function getFasilitas()
    {
        return response()->json(Fasilitas::all());
    }

    public function getFasilitasById($id)
    {
        $data = Fasilitas::find($id);

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($data);
    }

    public function updateFasilitas(Request $request, string $id)
{
    try {
        Log::info('Masuk ke updateSectionFaq');
        Log::info('Request all:', $request->all());
        Log::info('File Gambar:', [$request->file('Gambar')]);

        $data = Fasilitas::findOrFail($id);

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
        $fields = [ 'judul', 'deskripsi'];
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

    public function deleteFasilitas($id)
    {
        $data = Fasilitas::find($id);

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
