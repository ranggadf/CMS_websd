<?php

namespace App\Http\Controllers;

use App\Models\LimaC;
use Illuminate\Http\Request;

class LimaC_Controller extends Controller
{
    function limac(Request $req)
    {
        $limac = new LimaC;
        $limac->no_pengajuan = $req->input('no_pengajuan');
        $limac->characters = $req->input('characters');
        $limac->capacity = $req->input('capacity');
        $limac->capital = $req->input('capital');
        $limac->collateral = $req->input('collateral');
        $limac->conditions = $req->input('conditions');
        $limac->save();
        return $limac;
    }
    public function getAllLimaC()
    {
        $limac = LimaC::all();
        return response()->json($limac);
    }
    public function getLimaCByNoPengajuan(string $no_pengajuan)
    {
        $limaC = LimaC::where('no_pengajuan', $no_pengajuan)->get();
        return response()->json($limaC);
    }
    
    public function update(Request $request, string $no_pengajuan)
    {
        $limaC = LimaC::where('no_pengajuan', $no_pengajuan)->firstOrFail();

        $validatedData = $request->validate([
            'no_pengajuan' => 'required|string',
            'characters' => 'required|string',
            'capacity' => 'required|string',
            'capital' => 'required|string',
            'collateral' => 'required|string',
            'conditions' => 'required|string',
        ]);

        $limaC->update($validatedData);

        return response()->json($limaC);
    }
}
