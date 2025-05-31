<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ReviewTemplate;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewTemplate>
 */
class ReviewTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ReviewTemplate::class;

    public function definition(): array
    {
        return [
            'template_name' => $this->faker->sentence,
            'description' => $this->faker->sentence,
        ];
    }
}
