<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BeritaController extends Controller
{
    // ✅ Tambah Data
    public function tambahBerita(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $berita = new Berita();
        $berita->judul = $request->judul;
        $berita->deskripsi = $request->deskripsi;

        // Upload gambar jika ada
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/berita'), $filename);
            $berita->gambar = 'images/berita/' . $filename;
        }

        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'data' => $berita
        ], 201);
    }

    // ✅ Get Semua Data
    public function getBerita()
    {
        return response()->json(Berita::orderBy('created_at', 'desc')->get());
    }

    // ✅ Get Data by ID
    public function getBeritaByID($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($berita);
    }

    // ✅ Update Data
    public function updateBerita(Request $request, $id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $berita->judul = $request->judul;
        $berita->deskripsi = $request->deskripsi;

        // Jika upload gambar baru
        if ($request->hasFile('gambar')) {
            if ($berita->gambar && File::exists(public_path($berita->gambar))) {
                File::delete(public_path($berita->gambar));
            }

            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/berita'), $filename);
            $berita->gambar = 'images/berita/' . $filename;
        }

        $berita->save();

        return response()->json([
            'message' => 'Berita berhasil diupdate',
            'data' => $berita
        ]);
    }

    // ✅ Hapus Data
    public function deleteBerita($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($berita->gambar && File::exists(public_path($berita->gambar))) {
            File::delete(public_path($berita->gambar));
        }

        $berita->delete();
        return response()->json(['message' => 'Berita berhasil dihapus']);
    }
}
