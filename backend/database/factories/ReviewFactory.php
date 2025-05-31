<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Employee;
use App\Models\Review;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()?->id ?? Employee::factory(), 
            'title' => $this->faker->sentence,
            'created_at' => $this->faker->date(),
            'comments' => $this->faker->paragraph,
        ];
    }
}
