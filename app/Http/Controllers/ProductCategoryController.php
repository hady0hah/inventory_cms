<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductCategory $productCategory)
    {

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $productCategory->update([
            'name' => $request->input('name'),
        ]);

        return response()->json(['message' => 'Category updated successfully.']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productCategory = ProductCategory::findOrFail($id);
        $productCategory->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }


    public function getAllProductCategories()
    {
        $categories = ProductCategory::all();
        // no need for now to paginate
//        $categories = ProductCategory::paginate(10);
        return response()->json($categories);
    }
}
