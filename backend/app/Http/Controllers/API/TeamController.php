<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::with('members')->get();

        return response()->json([
            'success' => true,
            'data' => $teams
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'name' => 'required|string|max:50'
        ]);

        $team = Team::create($validation);

        return response()->json([
            'success' => true,
            'message' => 'Team is successfully created',
            'data' => $team
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $team = Team::with('members')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $team
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $team = Team::with('members')->findOrFail($id);

        $validation = [
            'name' => 'required|string|max:50'
        ];

        $team->update($validation);

        return response()->json([
            'success' => true,
            'message' => 'Team is successfully updated',
            'data' => $team
        ], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $team = Team::with('members')->findOrFail($id);

        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team is successfully deleted',
            'data' => $team
        ], 204);
    }
}
