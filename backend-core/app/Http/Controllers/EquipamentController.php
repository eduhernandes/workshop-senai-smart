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

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //funciona como o POST /equipaments
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipament $equipament)
    {
        //Funciona como o GET /equipaments/{id}
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipament $equipament)
    {
        //Funciona como o PUT /equipaments/{id}
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipament $equipament)
    {
        //Funciona como o DELETE /equipaments/{id}
    }
}
