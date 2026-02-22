<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $configuration = Config::first();

        return response()->json([
            'success' => true,
            'data' => $configuration
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Config $config)
    {
        $validation = $request->validate([
            'competition_name' => 'required|max:100',
            'year' => 'required',
            'label_link' => 'required|max:75',
            'link' => 'required'
        ]);

        $config->update($validation);

        return response()->json([
            'success' => true,
            'message' => 'Web Configuration updated successfully',
            'data' => $config
        ], 200);
    }
}
