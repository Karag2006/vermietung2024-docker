<?php
use App\Http\Controllers\PriceController;
use Illuminate\Support\Facades\Route;

Route::get('/price', [PriceController::class, 'index'])->name('price.index');
Route::post('/price', [PriceController::class, 'store'])->name('price.store');
Route::get('/price/{price}', [PriceController::class, 'show'])->name('price.show');
Route::patch('/price/{price}', [PriceController::class, 'update'])->name('price.update');
Route::delete('/price/{price}', [PriceController::class, 'destroy'])->name('price.destroy');

?>