<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewCriteria extends Model
{
   use HasFactory;
   protected $fillable = ['review_id','review_template_id','criteria_name','score'];

   public function review()
   {
    return $this->belongsTo(Review::class);
   }

   public function reviewTemplate()
   {
    return $this->belongsTo(ReviewTemplate::class);
   }
}
