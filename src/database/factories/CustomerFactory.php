<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pass_number' => Str::random(10),
            'name1' => $this->faker->unique()->name(),
            'name2' => $this->faker->name(),
            'street' => $this->faker->streetAddress(),
            'plz' => $this->faker->numberBetween($min = 10000, $max = 99999),
            'city' => $this->faker->city(),
            'birth_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'birth_city' => $this->faker->city(),
            'phone' => $this->faker->e164PhoneNumber(),
            'car_number' => "SU - FK " . $this->faker->numberBetween($min = 10, $max = 9999),
            'email' => $this->faker->unique()->safeEmail(),
            'driving_license_no' => Str::random(10),
            'driving_license_class' => $this->faker->randomElement($array = array('B', 'BE', 'B96', 'Klasse 3')),
            'comment' => $this->faker->text($maxNbChars = 200),
        ];
    }
}
