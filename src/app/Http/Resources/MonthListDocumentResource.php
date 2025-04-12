<?php

namespace App\Http\Resources;

use App\Models\CollectAddress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonthListDocumentResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $document = [
            'id' => $this->id,
            'collect_address' => new CollectAddressResource(CollectAddress::find($this->collect_address_id)),
            'collect_address_id' => $this->collect_address_id,
            'collect_at' => $this->collect_at,
            'contract_number' => $this->contract_number ?? '',
            'current_state' => $this->current_state,
            'customer_name1'=> $this->customer_name1,
            'is_archived' => $this->is_archived,
            'offer_number' => $this->offer_number ?? '',
            'reservation_number' => $this->reservation_number ?? '',
            'return_at' => $this->return_at,
            'total_price' => $this->total_price,
            'vehicle_id' => $this->vehicle_id,
            'vehicle_title' => $this->vehicle_title,
            'vehicle_plateNumber' => $this->vehicle_plateNumber,
            'collect_date' => $this->collect_date,
            'return_date' => $this->return_date,
            'collect_time' => $this->collect_time,
            'return_time' => $this->return_time,

            'phone' => $this->customer_phone ?? '',
            'comment' => $this->comment ?? '',
        ];

        return $document;
    }
}
