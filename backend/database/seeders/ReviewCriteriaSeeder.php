<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ReviewCriteria;
use App\Models\Review;
use App\Models\ReviewTemplate;


class ReviewCriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
       $reviews = Review::all();
        $templates = ReviewTemplate::all();

        foreach ($reviews as $review) {
            $template = $templates->random(); // randomly assign a template

            if ($template) {
                ReviewCriteria::create([
                    'review_id' => $review->id,
                    'review_template_id' => $template->id,
                    'criteria_name' => 'Teamwork',
                    'score' => rand(2, 4),
                ]);

                ReviewCriteria::create([
                    'review_id' => $review->id,
                    'review_template_id' => $template->id,
                    'criteria_name' => 'Initiative',
                    'score' => rand(2, 4),
                ]);

                ReviewCriteria::create([
                    'review_id' => $review->id,
                    'review_template_id' => $template->id,
                    'criteria_name' => 'Communication',
                    'score' => rand(2, 4),
                ]);

            }
        }

    }
}
