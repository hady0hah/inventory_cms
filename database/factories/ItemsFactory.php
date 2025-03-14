<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Items>
 */
class ItemsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    // run command
    // php artisan db:seed --class=ItemsSeeder

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'serial_number' => $this->faker->unique()->uuid(),
            'number_of_items' => $this->faker->numberBetween(1, 100),
            'is_sold' => $this->faker->boolean(20),
            'published' => $this->faker->boolean(90),
            'user_id' => User::factory(),
            'product_category_id' => ProductCategory::factory(),
        ];
    }
}
