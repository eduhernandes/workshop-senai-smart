<?php

namespace App\Http\Controllers;

use App\Models\Equipament;
use Illuminate\Http\Request;

class EquipamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //funciona como o GET /equipaments
        return response()->json(Equipament::all(), 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //funciona como o POST /equipaments
        $equipament = Equipament::create($request->all());

        return response()->json($equipament, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipament $equipament)
    {
        //Funciona como o GET /equipaments/{id}
        return response()->json($equipament, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipament $equipament)
    {
        //Funciona como o PUT/PATCH /equipaments/{id}
        $equipament->update($request->all());
        return response()->json($equipament, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipament $equipament)
    {
        //Funciona como o DELETE /equipaments/{id}
        $equipament->delete();
        return response()->json(null, 204);
    }

}

