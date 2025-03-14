<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends BaseModel
{
    /** @use HasFactory<\Database\Factories\ProductCategoryFactory> */
    use HasFactory;

    protected $table = 'product_categories';

    protected $fillable = [
        'name',
        'image_path',
        'published',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(ProductCategory::class, 'product_category_id');
    }
}
