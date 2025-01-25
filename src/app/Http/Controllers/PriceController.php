<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StorePriceRequest;
use App\Http\Requests\UpdatePriceRequest;
use App\Models\Price;
use App\Models\Trailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse
    {
        /** 
         * @var Collection $trailers 
         */
        $trailers = Trailer::select('plateNumber', 'title', 'totalWeight', 'usableWeight', 'loading_size', 'price_id')
            ->with('price')
            ->orderBy('plateNumber')
            ->get();

        /** 
         * @var Collection $prices 
         */
        $prices = Price::select('*')
            ->orderBy('name')
            ->get();

        return Inertia::render('Price/index', [
            'trailers' => $trailers,
            'prices' => $prices
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePriceRequest $request): void
    {
        $price = Price::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Price $price): JsonResponse
    {
        return response()->json($price, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePriceRequest $request, Price $price): void
    {
        $price->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Price $price): void
    {
        $price->delete();
    }
}
