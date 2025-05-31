<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//ADD DIRI ANG MODEL SA REVIEW TEMPLATE
use App\Models\ReviewTemplate;

class ReviewTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReviewTemplate::with('reviewCriteria')->get();

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
            'template_name' => 'required|string', //title
            'description' => 'nullable|string',
        ]);

        $template = ReviewTemplate::create($validated);
        
        return response()->json($template, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $template = ReviewTemplate::with('reviewCriteria')->findOrFail($id);
        
        return response()->json($template);
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
        $template = ReviewTemplate::findOrFail($id);
        
        $validated = $request->validate([
            'template_name' => 'string', //title
            'description' => 'string',
        ]);

        $template->update($validated);

        return response()->json($template);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $template = ReviewTemplate::findOrFail($id);
        $template->delete();

        return response()->json(['message' => 'Deleted Successfully']);
    }
}
