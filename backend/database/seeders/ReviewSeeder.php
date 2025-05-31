<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Employee;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $employee) {
            Review::create([
                'employee_id' => $employee->id,
                'title' => 'Mid-Year Performance Review',
                'comments' => 'Strong communication and team skills.',
                'created_at' => now()->subDays(rand(1, 90)),
            ]);
        }
    }
}
