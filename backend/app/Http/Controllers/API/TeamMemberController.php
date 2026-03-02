<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // storage for image

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::with('team')->get();

        return response()->json([
            'success' => true,
            'data' => $members
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|max:100',
            'role' => 'required|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // uniqid
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            // store to storage/public/members
            $path = $image->storeAs('members', $imageName, 'public');

            if ($path) {
                $member = TeamMember::create([
                    'team_id' => $request->team_id,
                    'name' => $request->name,
                    'role' => $request->role,
                    'image' => $imageName,
                ]);

                return response()->json([
                    'success' => true,
                    'data' => $member
                ], 201);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Gagal memproses upload gambar'
        ], 500);
    }

    public function show(TeamMember $member)
    {
        return response()->json([
            'success' => true,
            'data' => $member
        ], 200);
    }

    public function update(Request $request, TeamMember $member)
    {
        $request->validate([
            'team_id' => 'required',
            'name' => 'required|max:100',
            'role' => 'required|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $data = $request->only(['team_id', 'name', 'role']);

        // if user upload new image
        if ($request->hasFile('image')) {
            // delete the old image
            Storage::delete('members/' . $member->image);

            // save new image to storage
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('members', $imageName, 'public');

            $data['image'] = $imageName;
        }

        $member->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Member updated successfully',
            'data' => $member
        ], 200);
    }

    public function destroy(TeamMember $member)
    {
        // delete physical image from file
        Storage::delete('members/' . $member->image);

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Member deleted successfully'
        ], 200);
    }
}
