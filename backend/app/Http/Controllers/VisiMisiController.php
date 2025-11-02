<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisiMisi;

class VisiMisiController extends Controller
{
    public function index()
    {
        return response()->json(VisiMisi::all());
    }

    public function Tambahvisimisi(Request $request)
    {
        $data = new VisiMisi();
        $data->visi = json_encode($request->visi);
        $data->misi = json_encode($request->misi);
        $data->save();

        return response()->json(['message' => 'Data berhasil ditambahkan']);
    }

    public function updatevisimisi(Request $request, $id)
    {
        $data = VisiMisi::findOrFail($id);
        $data->visi = json_encode($request->visi);
        $data->misi = json_encode($request->misi);
        $data->save();

        return response()->json(['message' => 'Data berhasil diperbarui']);
    }

    public function deletevisimisi($id)
    {
        VisiMisi::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
