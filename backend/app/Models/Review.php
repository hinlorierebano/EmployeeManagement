<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['employee_id', 'title', 'comments'];
    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function reviewCriterias()
    {
        return $this->hasMany(ReviewCriteria::class);
    }
}
