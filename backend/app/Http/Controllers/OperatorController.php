<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operator;
use Illuminate\Support\Facades\Hash;

class OperatorController extends Controller
{
    // Ambil semua operator dengan status 2
    public function index()
    {
        $operators = Operator::where('status', 2)->get();
        return response()->json($operators);
    }

    // Tambah operator baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'required',
            'address' => 'required',
        ]);

        $operator = Operator::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'status' => 2,
        ]);

        return response()->json([
            'message' => 'Operator berhasil ditambahkan',
            'data' => $operator
        ], 201);
    }

    // Update operator (tanpa ubah email & password)
    public function update(Request $request, $id)
    {
        $operator = Operator::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        $operator->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return response()->json([
            'message' => 'Operator berhasil diperbarui',
            'data' => $operator
        ], 200);
    }

    // Hapus operator
    public function destroy($id)
    {
        $operator = Operator::findOrFail($id);
        $operator->delete();
        return response()->json(['message' => 'Operator dihapus']);
    }
}
