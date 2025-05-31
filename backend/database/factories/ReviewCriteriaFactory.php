<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ReviewCriteria;
use App\Models\ReviewTemplate;
use App\Models\Review;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewCriteria>
 */
class ReviewCriteriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ReviewCriteria::class;

    public function definition()
    {
        return [
            'review_id' => Review::inRandomOrder()->first()?->id ?? Review::factory(),
            'criteria_name' => $this->faker->randomElement(['Communication', 'Teamwork', 'Punctuality', 'Quality of Work']),
            'score' => $this->faker->numberBetween(1, 10),
            'review_template_id' => ReviewTemplate::inRandomOrder()->first()?->id ?? ReviewTemplate::factory(),
        ];
    }
}
