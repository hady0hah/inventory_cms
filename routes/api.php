<?php

use App\Http\Controllers\ItemsController;
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

// Items APIs
Route::prefix('item')->group(function () {
    Route::get('getAll/{uid}/{category_id}', [ItemsController::class, 'getItemsByUserAndCategory'])->name('items.index');
    Route::post('create', [ItemsController::class, 'create'])->name('items.create');
    Route::put('edit/{id}', [ItemsController::class, 'update'])->name('items.update');
    Route::delete('delete/{id}', [ItemsController::class, 'destroy'])->name('items.destroy');
    Route::delete('status/{id}', [ItemsController::class, 'changeItemStatus'])->name('items.status');
});


