<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController; // <-- Importante: Importar o Controller

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// A linha mágica que cria as rotas GET, POST, PUT, DELETE
Route::apiResource('rooms', RoomController::class);