<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductCategorySeeder extends Seeder
{
    public function run()
    {
        ProductCategory::factory()->count(20)->create();
    }
}

