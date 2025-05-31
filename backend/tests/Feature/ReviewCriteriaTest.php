<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\ReviewCriteria;
use App\Models\ReviewTemplate;
use App\Models\Review;

class ReviewCriteriaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;

    public function test_can_create_review_criteria()
    {
        $review = Review::factory()->create();
        $template = ReviewTemplate::factory()->create();

        $response = $this->postJson('/api/review-criterias', [

            'review_id' => $review->id,
            'criteria_name' => 'Teamwork',
            'score' => 10,
            'review_template_id' => $template->id,
        ]);

        $response->assertStatus(201)->assertJsonFragment(['criteria_name' => 'Teamwork']);
    }

    public function test_can_list_review_criteria()
    {
         ReviewCriteria::factory()->count(4)->create();

        $response = $this->getJson('/api/review-criterias');

        $response->assertStatus(200)->assertJsonCount(4);
    }

    public function test_can_update_review_criteria()
    {
        $criteria = ReviewCriteria::factory()->create();

        $response = $this->putJson("/api/review-criterias/{$criteria->id}", [
            'review_id' => $criteria->review_id,
            'criteria_name' => 'Updated Criteria',
            'score' => 8,
            'review_template_id' => $criteria->review_template_id,
        ]);

        $response->assertStatus(200)->assertJsonFragment([
            'criteria_name' => 'Updated Criteria',
            'score' => 8,
        ]);
    }

    public function test_can_delete_review_criteria()
    {
        $criteria = ReviewCriteria::factory()->create();

        $response = $this->deleteJson("/api/review-criterias/{$criteria->id}");

        $response->assertStatus(200)->assertJson([
            'message' => 'Deleted Successfully',
        ]);

        $this->assertDatabaseMissing('review_criterias', ['id' => $criteria->id]);
    }
}
