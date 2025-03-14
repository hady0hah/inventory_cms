<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductCategory>
 */
class ProductCategoryFactory extends Factory
{

    protected $model = ProductCategory::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    // use command to generate
    // php artisan db:seed --class=ProductCategorySeeder

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'image_path' => $this->faker->imageUrl(640, 480, 'product_categories', true),
        ];
    }
}
