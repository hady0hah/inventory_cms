<?php

namespace App\Repositories;

use App\Models\Items;
use App\Models\User;
use http\Env\Request;
use Illuminate\Support\Facades\Auth;

class ItemsRepository
{

    public function getItemsByUserAndCategory($uid, $category_id)
    {

        $items = Items::where('user_id', $uid)
            ->where('product_category_id', $category_id)
            ->get();

        return $items;
    }

    public function itemBelongsToUser($item_id, $user_id)
    {
        return Items::where('id', $item_id)
            ->where('user_id', $user_id)
            ->exists();
    }


}
