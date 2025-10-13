<?php

namespace App\Http\Controllers;

use App\Models\RegisterNasabah;
use Illuminate\Http\Request;

class RegisterNasabahController extends Controller
{
    public function index()
    {
        $data = RegisterNasabah::all();
        return response()->json($data);
    }
}
