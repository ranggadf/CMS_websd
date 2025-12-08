<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileSekolah;
use Illuminate\Support\Facades\File;

class ProfileSekolahController extends Controller
{
    // ✅ Ambil Semua Data
    public function index()
    {
        return response()->json(ProfileSekolah::orderBy('created_at', 'desc')->get());
    }

    // ✅ Tambah Data Profile
    public function tambahProfile(Request $request)
    {
        $request->validate([
            'section' => 'required|string|max:255',
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $profile = new ProfileSekolah();
        $profile->section = $request->section;
        $profile->judul = $request->judul;
        $profile->konten = $request->konten;
        $profile->email = $request->email;
        $profile->alamat = $request->alamat;
        $profile->no_telp = $request->no_telp;

        // ✅ Upload gambar jika ada
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/profile'), $filename);
            $profile->gambar = 'images/profile/' . $filename;
        }

        $profile->save();

        return response()->json([
            'message' => 'Profile sekolah berhasil ditambahkan',
            'data' => $profile
        ], 201);
    }

    // ✅ Update Data Profile
    public function updateProfile(Request $request, $id)
    {
        $profile = ProfileSekolah::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'section' => 'nullable|string|max:255',
            'judul' => 'nullable|string|max:255',
            'konten' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $profile->section = $request->section ?? $profile->section;
        $profile->judul = $request->judul ?? $profile->judul;
        $profile->konten = $request->konten ?? $profile->konten;
        $profile->email = $request->email ?? $profile->email;
        $profile->alamat = $request->alamat ?? $profile->alamat;
      if ($request->has('no_telp')) {
    $profile->no_telp = $request->no_telp;
}


        // ✅ Ganti gambar jika upload baru
        if ($request->hasFile('gambar')) {
            if ($profile->gambar && File::exists(public_path($profile->gambar))) {
                File::delete(public_path($profile->gambar));
            }

            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/profile'), $filename);
            $profile->gambar = 'images/profile/' . $filename;
        }

        $profile->save();

        return response()->json([
            'message' => 'Profile sekolah berhasil diperbarui',
            'data' => $profile
        ]);
    }

    // ✅ Hapus Data Profile
    public function deleteProfile($id)
    {
        $profile = ProfileSekolah::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($profile->gambar && File::exists(public_path($profile->gambar))) {
            File::delete(public_path($profile->gambar));
        }

        $profile->delete();

        return response()->json(['message' => 'Profile sekolah berhasil dihapus']);
    }
}
