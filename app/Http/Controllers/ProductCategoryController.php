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
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        } else {
            $imagePath = null;
        }

        $category = ProductCategory::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image_path' => $imagePath,
        ]);

        return response()->json(['message' => 'Category created successfully!', 'category' => $category], 201);
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
    public function update(Request $request, $id)
    {
        $productCategory = ProductCategory::findOrFail($id);
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/categories', 'public');

            $productCategory->update([
                'name' => $request->input('name'),
                'image_path' => $imagePath,
            ]);
        } else {
            $productCategory->update([
                'name' => $request->input('name'),
            ]);
        }

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
//        $categories = ProductCategory::all();
        // no need for now to paginate
//        $categories = ProductCategory::paginate(10);
        $categories = ProductCategory::withCount([
            'items as available_items_count' => function ($query) {
                $query->where('is_sold', 0);
            }
        ])
            ->get();

        return response()->json($categories);
    }
}
