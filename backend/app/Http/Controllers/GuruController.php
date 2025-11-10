<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class GuruController extends Controller
{
    // ✅ Tambah Data Guru
    public function tambahGuru(Request $request)
    {
        $request->validate([
            'kategori' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $guru = new Guru();
        $guru->kategori = $request->kategori;
        $guru->nama = $request->nama;
        $guru->jabatan = $request->jabatan;

        // Upload gambar jika ada
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/guru'), $filename);
            $guru->gambar = 'images/guru/' . $filename;
        }

        $guru->save();

        return response()->json([
            'message' => 'Guru berhasil ditambahkan',
            'data' => $guru
        ], 201);
    }

    // ✅ Get Semua Data Guru
    public function getGuru()
    {
        return response()->json(Guru::orderBy('created_at', 'desc')->get());
    }

    // ✅ Get Data Guru by ID
    public function getGuruByID($id)
    {
        $guru = Guru::find($id);
        if (!$guru) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($guru);
    }

    // ✅ Update Data Guru
    public function updateGuru(Request $request, $id)
    {
        $guru = Guru::find($id);
        if (!$guru) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'kategori' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $guru->kategori = $request->kategori;
        $guru->nama = $request->nama;
        $guru->jabatan = $request->jabatan;

        // Jika upload gambar baru
        if ($request->hasFile('gambar')) {
            if ($guru->gambar && File::exists(public_path($guru->gambar))) {
                File::delete(public_path($guru->gambar));
            }

            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/guru'), $filename);
            $guru->gambar = 'images/guru/' . $filename;
        }

        $guru->save();

        return response()->json([
            'message' => 'Guru berhasil diupdate',
            'data' => $guru
        ]);
    }

    // ✅ Hapus Data Guru
    public function deleteGuru($id)
    {
        $guru = Guru::find($id);
        if (!$guru) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($guru->gambar && File::exists(public_path($guru->gambar))) {
            File::delete(public_path($guru->gambar));
        }

        $guru->delete();
        return response()->json(['message' => 'Guru berhasil dihapus']);
    }

    // ✅ Get semua kategori guru beserta datanya (dengan urutan khusus)
    public function getGuruByKategoriAll()
    {
        $kategoriList = Guru::select('kategori')
            ->distinct()
            ->pluck('kategori');

        $data = [];

        foreach ($kategoriList as $kategori) {
            $query = Guru::where('kategori', $kategori);

            // 🔹 Urutan khusus untuk kategori tertentu
            if ($kategori === 'Kepala Sekolah') {
                $query->orderByRaw("
                    CASE 
                        WHEN jabatan = 'Kepala Sekolah' THEN 1
                        WHEN jabatan = 'Wakil Kepala Sekolah' THEN 2
                        ELSE 3
                    END
                ");
            } elseif ($kategori === 'Guru Kelas') {
                $query->orderByRaw("
                    CASE 
                        WHEN jabatan LIKE '%Kelas 1%' THEN 1
                        WHEN jabatan LIKE '%Kelas 2%' THEN 2
                        WHEN jabatan LIKE '%Kelas 3%' THEN 3
                        WHEN jabatan LIKE '%Kelas 4%' THEN 4
                        WHEN jabatan LIKE '%Kelas 5%' THEN 5
                        WHEN jabatan LIKE '%Kelas 6%' THEN 6
                        ELSE 7
                    END
                ");
            } else {
                // Guru Mapel & Karyawan → tidak perlu urutan khusus
                $query->inRandomOrder();
            }

            $data[] = [
                'kategori' => $kategori,
                'gurus' => $query->get(),
            ];
        }

        return response()->json($data);
    }

}