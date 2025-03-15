<?php

use App\Http\Controllers\ProductCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Product Categories APIs
Route::prefix('category')->group(function () {
    Route::get('getAll', [ProductCategoryController::class, 'getAllProductCategories'])->name('categories.index');
    Route::post('create', [ProductCategoryController::class, 'create'])->name('categories.create');
    Route::put('edit/{id}', [ProductCategoryController::class, 'update'])->name('categories.update');
    Route::delete('delete/{id}', [ProductCategoryController::class, 'destroy'])->name('categories.destroy');
});


