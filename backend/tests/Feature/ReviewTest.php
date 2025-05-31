<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Review;
use App\Models\Employee;

class ReviewTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;

    public function test_can_create_review()
    {
        $employee = Employee::factory()->create();

        $response = $this->postJson('/api/reviews', [
            'employee_id' => $employee->id,
            'title' => 'Quarterly Performance Review',
            'comments' => 'Excellent performance throughout the quarter.'
        ]);

         $response->assertStatus(201)->assertJsonFragment([
            'employee_id' => $employee->id,
            'title' => 'Quarterly Performance Review'
        ]);
    }

    public function test_can_list_reviews()
    {
        Review::factory()->count(2)->create();

        $response = $this->getJson('/api/reviews');

        $response->assertStatus(200)->assertJsonCount(2);
    }

    public function test_can_update_review()
    {
        $employee = Employee::factory()->create();
        $review = Review::factory()->create([
            'employee_id' => $employee->id,
            'title' => 'Initial Title',
            'comments' => 'Initial comment',
        ]);

        $response = $this->putJson("/api/reviews/{$review->id}", [
            'employee_id' => $employee->id,
            'title' => 'Updated Title',
            'comments' => 'Updated comment',
        ]);

        $response->assertStatus(200)->assertJsonFragment([
            'title' => 'Updated Title',
            'comments' => 'Updated comment',
        ]);
    }

    public function test_can_delete_review()
    {
        $review = Review::factory()->create();

        $response = $this->deleteJson("/api/reviews/{$review->id}");

        $response->assertStatus(200)->assertJson([
            'message' => 'Deleted Successfully',
        ]);

        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }
}
