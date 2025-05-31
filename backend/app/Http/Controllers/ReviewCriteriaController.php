<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReviewCriteria;

class ReviewCriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReviewCriteria::with('reviewTemplate')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'review_id' => 'required|exists:reviews,id',
            'criteria_name' => 'required|string',
            'score' =>  'required|numeric', //integer
            'review_template_id' => 'required|exists:review_templates,id',
        ]);

        $criteria = ReviewCriteria::create($validated);

        return response()->json($criteria, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $criteria = ReviewCriteria::with('reviewTemplate', 'review')->findOrFail($id);

        return response()->json($criteria);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $criteria = ReviewCriteria::findOrFail($id);

        $validated = $request->validate([
            'review_id' => 'exists:reviews,id',
            'criteria_name' => 'string',
            'score' =>  'numeric', //integer
            'review_template_id' => 'exists:review_templates,id',
        ]);

        $criteria->update($validated);

        return response()->json($criteria);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $criteria = ReviewCriteria::findOrFail($id);
        $criteria->delete();

        return response()->json(['message' => 'Deleted Successfully']);
    }
}
