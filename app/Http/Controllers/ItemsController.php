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
    public function create()
    {
        //
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
    public function update(Request $request, Items $items)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, $user_id)
    {
        if ($this->itemBelongsToUser($user_id, $id)) {
            $item = Items::findOrFail($id);
            $item->delete();

            return response()->json(['message' => 'Item deleted successfully.']);
        }

        return response()->json(['message' => 'Not Allowed!'], 403);
    }


    public function getItemsByUserAndCategory($uid, $category_id)
    {
        $items = $this->itemsRepository->getItemsByUserAndCategory($uid, $category_id);

        return response()->json($items);
    }

    public function itemBelongsToUser($user_id,$item_id)
    {

        return $this->itemsRepository->itemBelongsToUser($user_id, $item_id);
    }

}
