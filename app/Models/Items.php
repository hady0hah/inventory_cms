<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    /** @use HasFactory<\Database\Factories\ItemsFactory> */
    use HasFactory;


    protected $table = 'items';

    protected $fillable = [
        'name',
        'serial_number',
        'published',
        'number_of_items',
        'is_sold',
        'user_id',
        'product_category_id',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
