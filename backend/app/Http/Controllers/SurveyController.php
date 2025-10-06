<?php

namespace App\Http\Controllers;

use App\Models\OutSurvey;
use App\Models\PilihanSurvey;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function addTitleSurvey(Request $request)
    {
        $survey = new Survey;
        $kodeTerakhir = Survey::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int)substr($kodeTerakhir, 1) + 1 : 1;
        $survey->Kode = sprintf('S%07d', $nomorBaru);
        $survey->Keterangan = $request->input('Keterangan');
        $survey->save();

        $pilihanSurvey = $request->input('pilihan_survey');
        foreach ($pilihanSurvey as $pilihan) {
            PilihanSurvey::create([
                'Kode' => $survey->Kode,
                'pertanyaan' => $pilihan['pertanyaan']
            ]);
        }
        $surveyWithPilihan = Survey::with('PilihanSurvey')->find($survey->Kode);
        return response()->json($surveyWithPilihan, 201);
    }
    public function updateTitleSurvey(Request $request, $kode)
    {
        $survey = Survey::where('Kode', $kode)->firstOrFail();
        $survey->Keterangan = $request->input('Keterangan');
        $survey->save();

        PilihanSurvey::where('Kode', $kode)->delete();

        $pilihanSurvey = $request->input('pilihan_survey');
        foreach ($pilihanSurvey as $pilihan) {
            PilihanSurvey::create([
                'Kode' => $survey->Kode,
                'pertanyaan' => $pilihan['pertanyaan']
            ]);
        }

        $surveyWithPilihan = Survey::with('PilihanSurvey')->find($kode);
        return response()->json($surveyWithPilihan, 200);
    }
    public function deleteRefSurvey($kode)
    {
        $survey = Survey::where('Kode', $kode)->firstOrFail();
        OutSurvey::where('Kode', $kode)->delete();
        PilihanSurvey::where('Kode', $kode)->delete();
        $survey->delete();
        return response()->json($survey, 200);
    }
    public function getSurvey()
    {
        $judulSurvey = Survey::with(["PilihanSurvey"])
        ->get();
        return response()->json($judulSurvey);
    }



    public function getAllSurvey()
    {
        $survey = OutSurvey::leftJoin('ref_survey', 'trx_survey.Kode', '=', 'ref_survey.Kode')
            ->select('ref_survey.*', 'trx_survey.*')
            ->get();
        return response()->json($survey);
    }
    public function getSurveyByNoPengajuan($no_pengajuan)
    {
        $survey = OutSurvey::where('no_pengajuan', $no_pengajuan)
            ->leftJoin('ref_survey', 'trx_survey.Kode', '=', 'ref_survey.Kode')
            ->select('ref_survey.*', 'trx_survey.*')
            ->get();
        return response()->json($survey);
    }
    public function addSurvey(Request $request)
    {
        $surveyData = $request->all();
        $no_pengajuan = $request->input('no_pengajuan');
        foreach ($surveyData as $key => $value) {
            if ($key === 'no_pengajuan') {
                continue;
            }else {
                $aspek = Survey::firstOrCreate([
                    'Keterangan' => $key,
                ]);
                OutSurvey::create([
                    'Kode' => $aspek->Kode,
                    'Pilihan' => $value,
                    'no_pengajuan' => $no_pengajuan
                ]);
            }
        }
        return response()->json($surveyData);
    }
    
    public function update(Request $request, $no_pengajuan)
    {
        $surveyData = $request->all();
        foreach ($surveyData as $key => $value) {
            if ($key === 'no_pengajuan') {
                continue;
            } else {
                $aspek = Survey::firstOrCreate([
                    'Keterangan' => $key,
                ]);
                OutSurvey::updateOrCreate(
                    ['Kode' => $aspek->Kode, 'no_pengajuan' => $no_pengajuan],
                    ['Pilihan' => $value]
                );
            }
        }
        return response()->json(['message' => 'Data survei berhasil diperbarui'], 200);
    }
}
