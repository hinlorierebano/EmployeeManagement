<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Employee;
use Database\Factories\EmployeeFactory;

class EmployeeTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;
    
    public function test_can_create_employee()
    {
        $response = $this->postJson('/api/employees', [
            'name' => 'Sample Name',
            'email' => 'jane@example.com',
            'position' => 'Programmer',
        ]);

        $response->assertStatus(201)->assertJsonFragment(['email' => 'jane@example.com']);
    }

    public function test_can_list_employees()
    {
        Employee::factory()->count(3)->create();

        $response = $this->getJson('/api/employees');

        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_can_update_employee()
    {
        $employee = Employee::factory()->create();

        $response = $this->putJson("/api/employees/{$employee->id}", [
            'name' => 'Updated Name',
            'email' => $employee->email, // or update email if you want
            'position' => 'Updated Position',
        ]);

        $response->assertStatus(200)->assertJsonFragment([
            'name' => 'Updated Name',
            'position' => 'Updated Position',
        ]);
    }

    public function test_can_delete_employee()
    {
        $employee = Employee::factory()->create();

        $response = $this->deleteJson("/api/employees/{$employee->id}");

        $response->assertStatus(200)->assertJson([
            'message' => 'Deleted Successfully',
        ]);

        $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
    }
}
