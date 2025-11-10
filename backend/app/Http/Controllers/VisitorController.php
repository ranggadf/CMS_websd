<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitor;

class VisitorController extends Controller
{
    // Simpan pengunjung baru
    public function store(Request $request)
    {
        $today = now()->toDateString();
        $exists = Visitor::where('ip_address', $request->ip())
            ->whereDate('created_at', $today)
            ->exists();

        if (!$exists) {
            Visitor::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
            ]);
        }

        return response()->json(['message' => 'Visitor recorded']);
    }

    // Ambil total pengunjung
    public function total()
    {
        $totalVisitors = Visitor::count();
        return response()->json(['total_visitors' => $totalVisitors]);
    }
}
