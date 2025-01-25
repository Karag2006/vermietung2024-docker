<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    /** @use HasFactory<\Database\Factories\PriceFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'stunden5',
        'tag1',
        'wochenende',
        'wochen1',
        'wochen2',
        'wochen3',
    ];

    public function trailers()
    {
        return $this->hasMany(Trailer::class);
    }

    public function getSelectAttribute()
    {
        return $this->name;
    }
}
