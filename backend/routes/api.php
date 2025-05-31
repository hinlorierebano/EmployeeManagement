<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewCriteriaController;
use App\Http\Controllers\ReviewTemplateController;

Route::post('/register', [AuthController::class, 'register']); //Optional rani for register
Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    //protected routes example:
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // //CRUD routess
    // Route::apiResource('employees', EmployeeController::class);
    // Route::apiResource('reviews', ReviewController::class);
    // Route::apiResource('review_criterias', ReviewCriteriaController::class);
    // Route::apiResource('review_templates', ReviewTemplateController::class);

});

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//CRUD routess
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('review-criterias', ReviewCriteriaController::class);
    Route::apiResource('review-templates', ReviewTemplateController::class);
