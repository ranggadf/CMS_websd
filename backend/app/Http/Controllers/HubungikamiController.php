<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HubungiKami;

class HubungiKamiController extends Controller
{
    public function index()
    {
        return response()->json(HubungiKami::orderBy('created_at', 'desc')->get());
    }

    public function tambahhubkami(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'alamat' => 'nullable|string',
        ]);

        $hubungi = HubungiKami::create($request->all());
        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $hubungi
        ], 201);
    }

    public function updatehubkami(Request $request, $id)
    {
        $hubungi = HubungiKami::find($id);
        if (!$hubungi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $hubungi->update($request->all());
        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $hubungi
        ]);
    }

    public function deletehubkami($id)
    {
        $hubungi = HubungiKami::find($id);
        if (!$hubungi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $hubungi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
