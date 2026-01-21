<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        
        // Retorna todas as salas ordenadas
        return response()->json(Room::all(), 200);
    }

    public function store(Request $request)
    {
        // Validação simples
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer',
        ]);

        $room = Room::create($request->all());

        return response()->json($room, 201);
    }
}