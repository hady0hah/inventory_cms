<?php

namespace App\Repositories;

use App\Models\Items;
use App\Models\ProductCategory;
use App\Models\User;
use http\Env\Request;
use Illuminate\Support\Facades\Auth;

class ProductCategoriesRepository
{

    public function getAllProductCategoriesWithCountOfNotSoldItems()
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

        return $categories;
    }
}
