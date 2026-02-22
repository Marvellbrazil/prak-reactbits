<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\ConfigController;
use App\Http\Controllers\API\TeamController;
use App\Http\Controllers\API\TeamMemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

// GET Methods
Route::get('/config', [ConfigController::class, 'index']);
Route::get('/teams', [TeamController::class, 'index']);
Route::get('/teams/{team}', [TeamController::class, 'show']);
Route::get('/members', [TeamMemberController::class, 'index']);
Route::get('/members/{member}', [TeamMemberController::class, 'show']);


Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);

    // APIs
    Route::apiResource('/config', ConfigController::class)->except(['index']);
    Route::apiResource('/teams', TeamController::class)->except(['index', 'show']);
    Route::apiResource('/members', TeamMemberController::class)->except(['index', 'show']);
});
