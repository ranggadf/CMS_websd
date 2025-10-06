<?php

use App\Http\Controllers\AspekFormController;
use App\Http\Controllers\FinansialController;
use App\Http\Controllers\JaminanController;
use App\Http\Controllers\LimaC_Controller;
use App\Http\Controllers\Pemohon2Controller;
use App\Http\Controllers\PemohonController;
use App\Http\Controllers\PengajuanKreditController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\RegisterNasabahController;
use App\Http\Controllers\SidebarController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//jaminan
Route::post('/jaminan', [JaminanController::class, 'jaminan']); //tambah data   
Route::get('/getalljaminan', [JaminanController::class, 'getalljaminan']); //get all data
Route::put('/updatejaminanbyid/{no_pengajuan}', [JaminanController::class, 'update']); //update data
Route::get('/getjaminanbyid/{no_pengajuan}', [JaminanController::class, 'getJaminanByNoPengajuan']); //get data by nomor rekening
Route::delete('/deletejaminanbyid/{no_pengajuan}/{jenisAgunan}', [JaminanController::class, 'delete']); //delete data
//finansial
Route::post('/finansial', [FinansialController::class, 'finansial']); //tambah data
Route::get('/getallfinansial', [FinansialController::class, 'getAllFinansial']); //get all data
Route::put('/updatefinansialbyid/{no_pengajuan}', [FinansialController::class, 'update']); //update data
Route::get('/getfinansialbynopengajuan/{no_pengajuan}', [FinansialController::class, 'getFinansialByNoPengajuan']); //get data by nomor rekening

//aspek
Route::post('/aspek', [AspekFormController::class, 'aspek']); //tambah data
Route::get('/getallaspek', [AspekFormController::class, 'getAllAspek']); //get all data
Route::get('/getaspekbynopengajuan/{no_pengajuan}', [AspekFormController::class, 'getAspekByNoPengajuan']); //get data by nomor rekening
Route::put('/updateaspekbyid/{no_pengajuan}', [AspekFormController::class, 'update']); //update data

//limac
Route::post('/limac', [LimaC_Controller::class, 'limac']); //tambah data
Route::get('/getalllimac', [LimaC_Controller::class, 'getAllLimaC']); //get all data
Route::get('/getlimacbynopengajuan/{no_pengajuan}', [LimaC_Controller::class, 'getLimaCByNoPengajuan']); //get data by nomor rekening
Route::put('/updatelimacbyid/{no_pengajuan}', [LimaC_Controller::class, 'update']); //update data

//survey
Route::get('/getSurvey', [SurveyController::class, 'getSurvey']); //get data
Route::post('/addSurvey', [SurveyController::class, 'addSurvey']); //tambah data
Route::get('/getallsurvey', [SurveyController::class, 'getAllSurvey']); //get all data
Route::get('/getsurveybynopengajuan/{no_pengajuan}', [SurveyController::class, 'getSurveyByNoPengajuan']); //get data by nomor rekening  
Route::put('/updatesurveybyid/{no_pengajuan}', [SurveyController::class, 'update']); //update data


//cms aspek
Route::post('/tambahTitleAspek', [AspekFormController::class, 'tambahTitleAspek']); //tambah title aspek
Route::get('/gettitleaspek', [AspekFormController::class, 'getTitleAspek']); //get title aspek
Route::put('/updatetitleaspekbyid/{Kode}', [AspekFormController::class, 'updateTitleAspek']); //update title aspek
Route::delete('/deletetitleaspekbyid/{Kode}', [AspekFormController::class, 'deleteTitleAspek']); //delete title aspek
//cms jaminan
Route::post('/tambahjenisagunan', [JaminanController::class, 'tambahjenisagunan']); //tambah jenis agunan
Route::get('/getjenisagunan', [JaminanController::class, 'getjenisagunan']); //get jenis agunan
Route::put('/updatejenisagunanbyid/{Kode}', [JaminanController::class, 'updateJenisAgunan']); //update jenis agunan
Route::delete('/deletejenisagunanbyid/{Kode}', [JaminanController::class, 'deleteJenisAgunan']); //delete jenis agunan
Route::post('/tambahHakMilik', [JaminanController::class, 'tambahHakMilik']); //tambah hak milik
Route::get('/getHakMilik', [JaminanController::class, 'getHakMilik']); //get all hak milik
Route::put('/updateHakMilikbyid/{Kode}', [JaminanController::class, 'updateHakMilik']); //update hak milik
Route::delete('/deleteHakMilikbyid/{Kode}', [JaminanController::class, 'deleteHakMilik']); //delete hak milik
Route::post('/tambahTipe', [JaminanController::class, 'tambahTipe']); //tambah tipe
Route::get('/getTipe', [JaminanController::class, 'getTipe']); //get all tipe
Route::put('/updateTipebyid/{Kode}', [JaminanController::class, 'updateTipe']); //update tipe
Route::delete('/deleteTipebyid/{Kode}', [JaminanController::class, 'deleteTipe']); //delete tipe
Route::post('/tambahJenisPengikatan', [JaminanController::class, 'tambahJenisPengikatan']); //tambah jenis pengikatan
Route::get('/getJenisPengikatan', [JaminanController::class, 'getJenisPengikatan']); //get all jenis pengikatan
Route::put('/updateJenisPengikatanbyid/{Kode}', [JaminanController::class, 'updateJenisPengikatan']); //update jenis pengikatan
Route::delete('/deleteJenisPengikatanbyid/{Kode}', [JaminanController::class, 'deleteJenisPengikatan']); //delete jenis pengikatan
Route::post('/tambahHubunganPemilik', [JaminanController::class, 'tambahHubunganPemilik']); //tambah hubungan pemilik
Route::get('/getHubunganPemilik', [JaminanController::class, 'getHubunganPemilik']); //get all hubungan pemilik
Route::put('/updateHubunganPemilikbyid/{Kode}', [JaminanController::class, 'updateHubunganPemilik']); //update hubungan pemilik
Route::delete('/deleteHubunganPemilikbyid/{Kode}', [JaminanController::class, 'deleteHubunganPemilik']); //delete hubungan pemilik

//pengajuan kredit
Route::get('/getgolongankredit', [PengajuanKreditController::class, 'getGolonganKredit']); //get golongan kredit

//cms pengajuan kredit/produk
Route::post('/tambahBidangUsaha', [PengajuanKreditController::class, 'tambahBidangUsaha']); //tambah bidang usaha
Route::get('/getbidangusaha', [PengajuanKreditController::class, 'getBidangUsaha']); //get bidang usaha
Route::put('/updatebidangusahabyid/{Kode}', [PengajuanKreditController::class, 'updateBidangUsaha']); //update bidang usaha
Route::delete('/deletebidangusahabyid/{Kode}', [PengajuanKreditController::class, 'deleteBidangUsaha']); //delete bidang usaha
Route::get('/getsifatkredit', [PengajuanKreditController::class, 'getSifatKredit']); //get sifat kredit
Route::post('/tambahSifatKredit', [PengajuanKreditController::class, 'tambahSifatKredit']); //tambah sifat kredit
Route::put('/updateSifatKreditbyid/{Kode}', [PengajuanKreditController::class, 'updateSifatKredit']); //update sifat kredit
Route::delete('/deleteSifatKreditbyid/{Kode}', [PengajuanKreditController::class, 'deleteSifatKredit']); //delete sifat kredit
Route::get('/getjenisanguran', [PengajuanKreditController::class, 'getJenisAngsuran']); //get jenis anguran
Route::post('/tambahJenisAnguran', [PengajuanKreditController::class, 'tambahJenisAngsuran']); //tambah jenis anguran
Route::put('/updateJenisAnguranbyid/{Kode}', [PengajuanKreditController::class, 'updateJenisAngsuran']); //update jenis anguran
Route::delete('/deleteJenisAnguranbyid/{Kode}', [PengajuanKreditController::class, 'deleteJenisAngsuran']); //delete jenis anguran
Route::get('/getjenispermohonan', [PengajuanKreditController::class, 'getJenisPermohonan']); //get jenis permohonan
Route::post('/tambahJenisPermohonan', [PengajuanKreditController::class, 'tambahJenisPermohonan']); //tambah jenis permohonan
Route::put('/updateJenisPermohonanbyid/{Kode}', [PengajuanKreditController::class, 'updateJenisPermohonan']); //update jenis permohonan
Route::delete('/deleteJenisPermohonanbyid/{Kode}', [PengajuanKreditController::class, 'deleteJenisPermohonan']); //delete jenis permohonan

//cms pemohon
Route::post('/tambahSektorEkonomi', [PemohonController::class, 'tambahSektorEkonomi']); //tambah sektor ekonomi
Route::get('/getsektorekonomi', [PemohonController::class, 'getSektorEkonomi']); //get sektor ekonomi
Route::put('/updatesektorekonomibyid/{Kode}', [PemohonController::class, 'updateSektorEkonomi']); //update sektor ekonomi
Route::delete('/deletesektorekonomibyid/{Kode}', [PemohonController::class, 'deleteSektorEkonomi']); //delete sektor ekonomi
Route::post('/tambahStatusUsaha', [PemohonController::class, 'tambahStatusUsaha']); //tambah status usaha
Route::get('/getstatususaha', [PemohonController::class, 'getStatusUsaha']); //get status usaha
Route::put('/updatestatususahabyid/{Kode}', [PemohonController::class, 'updateStatusUsaha']); //update status usaha
Route::delete('/deletestatususahabyid/{Kode}', [PemohonController::class, 'deleteStatusUsaha']); //delete status usaha  
Route::post('/tambahStatusTempatTinggal', [PemohonController::class, 'tambahStatusTempatTinggal']); //tambah status tempat tinggal
Route::get('/getstatusTempatTinggal', [PemohonController::class, 'getStatusTempatTinggal']); //get status tempat tinggal
Route::put('/updatestatusTempatTinggalbyid/{Kode}', [PemohonController::class, 'updateStatusTempatTinggal']); //update status tempat tinggal
Route::delete('/deletestatusTempatTinggalbyid/{Kode}', [PemohonController::class, 'deleteStatusTempatTinggal']); //delete status tempat tinggal
Route::post('/tambahProfesiSampingan', [PemohonController::class, 'tambahProfesiSampingan']); //tambah profesi sampingan
Route::get('/getprofesisampingan', [PemohonController::class, 'getProfesiSampingan']); //get profesi sampingan
Route::put('/updateprofesisampinganbyid/{Kode}', [PemohonController::class, 'updateProfesiSampingan']); //update profesi sampingan
Route::delete('/deleteprofesisampinganbyid/{Kode}', [PemohonController::class, 'deleteProfesiSampingan']); //delete profesi sampingan

//cms survey
Route::post('/addTitleSurvey', [SurveyController::class, 'addTitleSurvey']); //tambah data
Route::put('/updateTitleSurveybyid/{Kode}', [SurveyController::class, 'updateTitleSurvey']); //update data
Route::delete('/deleteRefSurveybyid/{Kode}', [SurveyController::class, 'deleteRefSurvey']); //delete data

//pemohon
Route::post('/pemohon', [PemohonController::class, 'pemohon']); //tambah data
Route::get('/getallpemohon', [PemohonController::class, 'index']); //get all data
Route::get('/pemohon/{cif}', [PemohonController::class, 'show']); //get data by cif
Route::get('/getpemohonbycif/{cif}', [PemohonController::class, 'getPemohonByCif']); //get data by cif
Route::put('/updatepemohonbyid/{cif}', [PemohonController::class, 'update']); //update data
Route::delete('/deletepemohonbyid/{Cif}', [PemohonController::class, 'destroy']); //delete data

//user
Route::post('/register', [UserController::class, 'register']); //tambah data
Route::post('/login', [UserController::class, 'login']); //login
Route::put('/updateuserbyid/{id}', [UserController::class, 'update']); //update data
//sidebar
Route::get('/user/{userId}/sidebars', [UserController::class, 'getUserWithSidebars']); //get data with sidebar
Route::get('/getallusersidebar', [UserController::class, 'getAllUsers']); //get all data
Route::post('/sidebars/update-status', [UserController::class, 'updateSidebarStatus']); //update status
Route::put('/sync-user-sidebars', [UserController::class, 'syncUserSidebars']); //sync user sidebar

//register nasabah
Route::get('/getregisternasabah', [RegisterNasabahController::class, 'index']); //get register nasabah

//produk/pengajuan kredit
Route::post('/produk', [ProdukController::class, 'produk']); //tambah data
Route::get('/getallproduk', [ProdukController::class, 'index']); //get all data
Route::get('/getprodukbyid/{no_pengajuan}', [ProdukController::class, 'getProdukById']); //get data by id
Route::get('/getprodukbycif/{cif}', [ProdukController::class, 'getProdukByCif']); //get data by cif
Route::put('/updatepengajuanbyid/{no_pengajuan}', [ProdukController::class, 'update']); //update data
Route::put('/updatestatuspengajuanbyid/{no_pengajuan}', [ProdukController::class, 'updateStatusPengajuan']); //update status pengajuan
Route::delete('/deleteprodukbyid/{NomorRekening}', [ProdukController::class, 'destroy']); //delete data
Route::get('/getlastpengajuan', [ProdukController::class, 'getLastPengajuan']); //get last pengajuan

Route::get('/check-cif/{cif}', [PemohonController::class, 'checkCif']);

//verify user
Route::post('/verify-user', [UserController::class, 'verifyUser']); //verify user
