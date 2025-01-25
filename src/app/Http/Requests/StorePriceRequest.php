<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\ValidationRule;

class StorePriceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string,ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:50',
            'stunden5' => 'numeric|min:0|nullable',
            'tag1' => 'numeric|min:0|nullable',
            'wochenende' => 'numeric|min:0|nullable',
            'wochen1' => 'numeric|min:0|nullable',
            'wochen2' => 'numeric|min:0|nullable',
            'wochen3' => 'numeric|min:0|nullable'
        ];
    }
}
