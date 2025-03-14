<?php

namespace Database\Seeders;

use App\Models\Items;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ItemsSeeder extends Seeder
{
    public function run()
    {
        Items::factory()->count(20)->create();
    }
}

