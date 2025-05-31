<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewTemplate extends Model
{
    use HasFactory;
    protected $fillable = ['template_name','description'];

    public function reviewCriteria()
    {
        return $this->hasMany(ReviewCriteria::class);
    }
}
