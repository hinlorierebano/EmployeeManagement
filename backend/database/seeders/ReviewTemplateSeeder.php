<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ReviewTemplate;

class ReviewTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        ReviewTemplate::create([
            'template_name' => 'Annual Review Template',
            'description' => 'Used for yearly employee evaluations.',
        ]);

        ReviewTemplate::create([
            'template_name' => 'Probation Review Template',
            'description' => 'Used for evaluating new hires after 6 months.',
        ]);
    }
}
