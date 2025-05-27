<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::middleware('api')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});

