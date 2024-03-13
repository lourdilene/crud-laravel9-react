<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateUfRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'sigla' => 'required | min:2 | max:255',
            'nome' => 'required | min:3 | max:255',
            'status' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'sigla.required' => 'O campo :attribute é necessário',
            'nome.required' => 'O campo :attribute é necessário',
            'status.required' => 'O campo :attribute é necessário'
        ];
    }
}
