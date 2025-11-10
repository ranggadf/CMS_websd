<?php

namespace App\Http\Controllers;

use App\Models\Ekskul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class EkstrakulikulerController extends Controller
{
    // ✅ Tambah Data
    public function tambahEkskul(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'Gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $fasilitas = new Ekskul();
        $fasilitas->judul = $request->judul;
        $fasilitas->deskripsi = $request->deskripsi;

        // Upload gambar jika ada
        if ($request->hasFile('Gambar')) {
            $file = $request->file('Gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/fasilitas'), $filename);
            $fasilitas->Gambar = 'images/fasilitas/' . $filename;
        }

        $fasilitas->save();

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'data' => $fasilitas
        ], 201);
    }

    // ✅ Get Semua Data
public function getEkskul()
    {
        return response()->json(Ekskul::all());
    }



    // ✅ Get Data by ID
    public function getEkskulByID($id)
    {
        $fasilitas = Ekskul::find($id);
        if (!$fasilitas) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($fasilitas);
    }

    // ✅ Update Data
    public function updateEkskul(Request $request, $id)
    {
        $fasilitas = Ekskul::find($id);
        if (!$fasilitas) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $fasilitas->judul = $request->judul;
        $fasilitas->deskripsi = $request->deskripsi;

        // Jika upload gambar baru
        if ($request->hasFile('Gambar')) {
            if ($fasilitas->Gambar && File::exists(public_path($fasilitas->Gambar))) {
                File::delete(public_path($fasilitas->Gambar));
            }

            $file = $request->file('Gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/fasilitas'), $filename);
            $fasilitas->Gambar = 'images/fasilitas/' . $filename;
        }

        $fasilitas->save();

        return response()->json([
            'message' => 'Berita berhasil diupdate',
            'data' => $fasilitas
        ]);
    }

    // ✅ Hapus Data
    public function deleteEkskul($id)
    {
        $fasilitas = Ekskul::find($id);
        if (!$fasilitas) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($fasilitas->Gambar && File::exists(public_path($fasilitas->Gambar))) {
            File::delete(public_path($fasilitas->Gambar));
        }

        $fasilitas->delete();
        return response()->json(['message' => 'Berita berhasil dihapus']);
    }
}