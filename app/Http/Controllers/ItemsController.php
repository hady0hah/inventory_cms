<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Repositories\ItemsRepository;
use Illuminate\Http\Request;

class ItemsController extends Controller
{

    protected $itemsRepository;

    public function __construct(ItemsRepository $itemsRepository)
    {
        $this->itemsRepository = $itemsRepository;
    }

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
            'serial_number' => 'required|string',
            'uid' => 'required|int',
            'category_id' => 'required|int',
        ]);
        $item = Items::create([
            'name' => $request->input('name'),
            'serial_number' => $request->input('serial_number'),
            'user_id' => $request->input('uid'),
            'product_category_id' => $request->input('category_id'),
        ]);

        return response()->json(['message' => 'Item created successfully!', 'item' => $item], 201);
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
    public function show(Items $items)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Items $items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = Items::findOrFail($id);
        $user_id = $request->input('uid');
        $isAllowedResponse = $this->userAllowedToAccessItem($user_id, $id);

        if ($isAllowedResponse instanceof \Illuminate\Http\JsonResponse) {
            return $isAllowedResponse;
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string',
            'uid' => 'required|int',
            'category_id' => 'required|int',
        ]);

        $item->update([
            'name' => $request->input('name'),
            'serial_number' => $request->input('serial_number'),
        ]);

        return response()->json(['message' => 'Item updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, $user_id)
    {
        $isAllowedResponse = $this->userAllowedToAccessItem($user_id, $id);

        if ($isAllowedResponse instanceof \Illuminate\Http\JsonResponse) {
            return $isAllowedResponse;
        }

       $item = Items::findOrFail($id);
       $item->delete();

       return response()->json(['message' => 'Item deleted successfully.']);

    }


    public function getItemsByUserAndCategory($uid, $category_id)
    {
        $items = $this->itemsRepository->getItemsByUserAndCategory($uid, $category_id);

        return response()->json($items);
    }

    public function userAllowedToAccessItem($user_id,$item_id)
    {
        $isAllowed = $this->itemsRepository->itemBelongsToUser($user_id, $item_id);

        if(!$isAllowed){
            return response()->json(['message' => 'Not Allowed!'], 403);
        }
    }


    public function changeItemStatus($id, $user_id)
    {
        $isAllowedResponse = $this->userAllowedToAccessItem($user_id, $id);

        if ($isAllowedResponse instanceof \Illuminate\Http\JsonResponse) {
            return $isAllowedResponse;
        }

        $item = Items::findOrFail($id);
        $item->is_sold = !$item->is_sold;
        $item->save();
        return response()->json(['message' => 'Item Status Changed successfully.','item_id' => $id , 'is_sold' => $item->is_sold]);

    }
}
