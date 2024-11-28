<?php

namespace App\Models;

use App\Http\Controllers\CollectAddressController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Attribute;

class Document extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function driver()
    {
        return $this->belongsTo(Customer::class, 'driver_id');
    }
    public function vehicle()
    {
        return $this->belongsTo(Trailer::class, 'vehicle_id');
    }
    public function collectAddress()
    {
        return $this->belongsTo(CollectAddress::class, 'collect_address_id');
    }

    protected $fillable = [
        // Document internal Values
        // 03.11.2024 Feature: Add Archive functionality - Add is_archived to the model
        'is_archived',
        'offer_number',
        'reservation_number',
        'contract_number',
        'offer_date',
        'reservation_date',
        'contract_date',
        'current_state',
        'collect_date',
        'return_date',
        'collect_time',
        'return_time',
        'total_price',
        'netto_price',
        'tax_value',
        'reservation_deposit_value',
        'reservation_deposit_date',
        'reservation_deposit_type',
        'reservation_deposit_recieved',
        'final_payment_value',
        'final_payment_date',
        'final_payment_type',
        'final_payment_recieved',
        'contract_bail',
        'contract_bail_date',
        'contract_bail_type',
        'contract_bail_return_type',
        'contract_bail_recieved',
        'contract_bail_returned',
        'comment',
        'user_id',



        // Customer Values
        'customer_id',
        'customer_pass_number',
        'customer_name1',
        'customer_name2',
        'customer_street',
        'customer_plz',
        'customer_city',
        'customer_birth_date',
        'customer_birth_city',
        'customer_phone',
        'customer_car_number',
        'customer_email',
        'customer_driving_license_no',
        'customer_driving_license_class',
        'customer_comment',


        // Driver Values
        'driver_id',
        'driver_pass_number',
        'driver_name1',
        'driver_name2',
        'driver_street',
        'driver_plz',
        'driver_city',
        'driver_birth_date',
        'driver_birth_city',
        'driver_phone',
        'driver_car_number',
        'driver_email',
        'driver_driving_license_no',
        'driver_driving_license_class',
        'driver_comment',


        // Vehicle Values
        'vehicle_id',
        'vehicle_title',
        'vehicle_plateNumber',
        'vehicle_chassisNumber',
        'vehicle_totalWeight',
        'vehicle_usableWeight',
        'vehicle_loading_size',
        'vehicle_comment',


        // Settings
        'vat',
        'offer_note',
        'reservation_note',
        'contract_note',
        'document_footer',
        'contactdata',


        // Collect Address
        'collect_address_id',

        // Equipment List
        'selectedEquipmentList',

        // 27.10.2024 - Fix/DatesAndTimes : collect_at and return_at for switching to dateTime instead of
        // seperated date and time fields as string
        'collect_at',
        'return_at',
    ];

    protected $dates = [
        'offer_date',
        'reservation_date',
        'contract_date',
        'collect_date',
        'return_date',
        'reservation_deposit_date',
        'final_payment_date',
        'contract_bail_date',
        'customer_birth_date',
        'driver_birth_date',
        // 27.10.2024 - Fix/DatesAndTimes : collect_at and return_at for switching to dateTime instead of
        // seperated date and time fields as string
        'collect_at',
        'return_at',
    ];

    public function getVehicleLoadingSizeAttribute($value){
        $temp = explode("x", $value);
        $length = intval(trim($temp[0]));
        $width = intval(trim($temp[1]));
        $height = isset($temp[2]) ? intval(trim($temp[2])) : 0;

        if($height > 0)
            return array($length, $width, $height);

        return array($length, $width);
    }

    public function setVehicleLoadingSizeAttribute($value){
        $this->attributes['vehicle_loading_size'] = implode(" x ", $value);
    }

    public function getOfferDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setOfferDateAttribute($value)
    {
        $this->attributes['offer_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    // 27.10.2024 - Fix/DatesAndTimes :
    // collect_at and return_at
    // for switching to dateTime instead of
    // seperated date and time fields as string
    public function getCollectAtAttribute($value) {
        return $value ? Carbon::parse($value) : null;
    }
    public function setCollectAtAttribute($value) {
        $this->attributes['collect_at'] = $value ? Carbon::parse($value) : null;
    }
    public function getReturnAtAttribute($value) {
        return $value ? Carbon::parse($value) : null;
    }
    public function setReturnAtAttribute($value) {
        $this->attributes['return_at'] = $value ? Carbon::parse($value) : null;
    }

    public function getReservationDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setReservationDateAttribute($value)
    {
        $this->attributes['reservation_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getContractDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setContractDateAttribute($value)
    {
        $this->attributes['contract_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getCollectDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setCollectDateAttribute($value)
    {
        $this->attributes['collect_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getCollectTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.time_format')) : null;
    }
    public function setCollectTimeAttribute($value)
    {
        $this->attributes['collect_time'] = $value ? Carbon::createFromFormat(config('custom.time_format'), $value)->format('H:i') : null;
    }

    public function getReturnTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.time_format')) : null;
    }
    public function setReturnTimeAttribute($value)
    {
        $this->attributes['return_time'] = $value ? Carbon::createFromFormat(config('custom.time_format'), $value)->format('H:i') : null;
    }

    public function getReturnDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setReturnDateAttribute($value)
    {
        $this->attributes['return_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getReservationDepositDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setReservationDepositDateAttribute($value)
    {
        $this->attributes['reservation_deposit_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getFinalPaymentDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setFinalPaymentDateAttribute($value)
    {
        $this->attributes['final_payment_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getContractBailDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setContractBailDateAttribute($value)
    {
        $this->attributes['contract_bail_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }

    public function getDriverBirthDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setDriverBirthDateAttribute($value)
    {
        $this->attributes['driver_birth_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }
    public function getCustomerBirthDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.date_format')) : null;
    }
    public function setCustomerBirthDateAttribute($value)
    {
        $this->attributes['customer_birth_date'] = $value ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') : null;
    }
}
