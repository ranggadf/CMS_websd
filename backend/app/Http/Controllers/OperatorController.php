<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operator;
use App\Models\Sidebar;
use Illuminate\Support\Facades\Hash;

class OperatorController extends Controller
{
    // 🔹 Ambil semua operator dengan status 2
    public function index()
    {
        $operators = Operator::where('status', 2)->get();

        // Tampilkan password meskipun disembunyikan di model
        $operators->makeVisible(['password']);

        return response()->json($operators);
    }

    // 🔹 Tambah operator baru + sidebars (status otomatis = 2)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        // Buat operator baru
        $operator = new Operator();
        $operator->name = $request->input('name');
        $operator->email = $request->input('email');
        $operator->password = Hash::make($request->input('password'));
        $operator->phone = $request->input('phone');
        $operator->address = $request->input('address');
        $operator->status = 2; // otomatis status 2

        // Ambil semua sidebar
        $sidebars = Sidebar::all(['sidebar_id', 'label', 'to_path', 'status', 'children']);

        // Pastikan children selalu array
        $sidebars = $sidebars->map(function ($sidebar) {
            $sidebar->children = $sidebar->children ?: [];
            return $sidebar;
        })->toArray();

        // Tambahkan sidebar ke operator
        $operator->sidebars = $sidebars;

        // Simpan data operator
        $operator->save();

        // Tampilkan password hash di hasil response
        $operator->makeVisible(['password']);

        return response()->json([
            'message' => 'Operator baru berhasil ditambahkan',
            'data' => $operator
        ], 201);
    }

    // 🔹 Update operator (email bisa diubah, password opsional)
    public function update(Request $request, $id)
    {
        $operator = Operator::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $operator->id, // ✅ validasi email unik kecuali diri sendiri
            'phone' => 'required|string',
            'address' => 'required|string',
            'password' => 'nullable|min:6',
        ]);

        $operator->name = $request->name;
        $operator->email = $request->email; // ✅ tambahkan ini agar email ikut diubah
        $operator->phone = $request->phone;
        $operator->address = $request->address;

        // Jika password diisi, hash baru
        if ($request->filled('password')) {
            $operator->password = Hash::make($request->password);
        }

        $operator->save();

        return response()->json([
            'message' => 'Operator berhasil diperbarui',
            'data' => $operator
        ], 200);
    }

    // 🔹 Hapus operator
public function destroy($id)
{
    $operator = Operator::findOrFail($id);
    $operator->delete();

    // Pastikan tabel benar (dari model)
    $table = (new Operator())->getTable();

    // Jika tabel kosong setelah delete terakhir, reset auto increment ke 1
    if (Operator::count() === 0) {
        \DB::statement("ALTER TABLE {$table} AUTO_INCREMENT = 1");
    }

    return response()->json(['message' => 'Operator dihapus dan ID direset jika tabel kosong']);
}



}
