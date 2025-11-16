<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SectionLanding;
use Illuminate\Support\Facades\Storage;

class LandingController extends Controller
{
    public function getLanding()
    {
        return response()->json(SectionLanding::orderBy('id', 'asc')->get());
    }

    public function tambahLanding(Request $request)
    {
        $request->validate([
            'section' => 'required|string',
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'Gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('Gambar')) {
            $gambarPath = $request->file('Gambar')->store('landing', 'public');
        }

        $data = SectionLanding::create([
            'section' => $request->section,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'nama' => $request->nama,
            'jml_siswa_laki' => $request->jml_siswa_laki,
            'jml_siswa_perempuan' => $request->jml_siswa_perempuan,
            'total_siswa' => $request->total_siswa,
            'Gambar' => $gambarPath, // <-- gunakan huruf besar di sini juga
        ]);

        return response()->json($data, 201);
    }

    public function updateLanding(Request $request, $id)
    {
        $data = SectionLanding::findOrFail($id);

        if ($request->hasFile('Gambar')) {
            if ($data->Gambar && Storage::disk('public')->exists($data->Gambar)) {
                Storage::disk('public')->delete($data->Gambar);
            }
            $data->Gambar = $request->file('Gambar')->store('landing', 'public');
        }

        $data->update([
            'section' => $request->section ?? $data->section,
            'judul' => $request->judul ?? $data->judul,
            'deskripsi' => $request->deskripsi ?? $data->deskripsi,
            'nama' => $request->nama ?? $data->nama,
            'jml_siswa_laki' => $request->jml_siswa_laki ?? $data->jml_siswa_laki,
            'jml_siswa_perempuan' => $request->jml_siswa_perempuan ?? $data->jml_siswa_perempuan,
            'total_siswa' => $request->total_siswa ?? $data->total_siswa,
            'Gambar' => $data->Gambar,
        ]);

        return response()->json(['message' => 'Berhasil diperbarui', 'data' => $data]);
    }

    public function deleteLanding($id)
    {
        $data = SectionLanding::findOrFail($id);
        if ($data->Gambar && Storage::disk('public')->exists($data->Gambar)) {
            Storage::disk('public')->delete($data->Gambar);
        }
        $data->delete();

        return response()->json(['message' => 'Berhasil dihapus']);
    }
}
