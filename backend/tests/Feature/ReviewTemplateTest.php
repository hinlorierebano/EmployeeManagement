<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\ReviewTemplate;

class ReviewTemplateTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;

    public function test_can_create_review_template()
    {
        $response = $this->postJson('/api/review-templates', [
            'template_name' => 'Annual Review',
            'description' => 'Annual performance review structure'
        ]);

        $response->assertStatus(201)->assertJsonFragment(['template_name' => 'Annual Review']);
    }

    public function test_can_list_review_templates()
    {
        ReviewTemplate::factory()->count(2)->create();

        $response = $this->getJson('/api/review-templates');

        $response->assertStatus(200)->assertJsonCount(2);
    }

    public function test_can_update_review_template()
    {
        $template = ReviewTemplate::factory()->create();

        $response = $this->putJson("/api/review-templates/{$template->id}", [
            'template_name' => 'Updated Template Name',
            'description' => 'Updated description',
        ]);

        $response->assertStatus(200)->assertJsonFragment([
            'template_name' => 'Updated Template Name',
            'description' => 'Updated description',
        ]);
    }

    public function test_can_delete_review_template()
    {
        $template = ReviewTemplate::factory()->create();

        $response = $this->deleteJson("/api/review-templates/{$template->id}");

        $response->assertStatus(200)->assertJson([
            'message' => 'Deleted Successfully',
        ]);

        $this->assertDatabaseMissing('review_templates', ['id' => $template->id]);
    }
}
