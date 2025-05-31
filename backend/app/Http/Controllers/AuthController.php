<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthController extends Controller
{
    //For Register new user (optional for now)
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' =>  $fields['email'],
            'password' => bcrypt($fields['password']), 
        ]);

        $token = $user->createToken('employeeapptoken')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token],201);
    }

    //Login Existing user
    public function login(Request $request)
{
    \Log::info('Login attempt', $request->all());
    
    $fields = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string'
    ]);

    $user = User::where('email', $fields['email'])->first();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Debug hash check
    if (!Hash::check($fields['password'], $user->password)) {
        return response()->json([
            'message' => 'Password incorrect',
            'entered' => $fields['password'],
            'stored' => $user->password
        ], 401);
    }

    $token = $user->createToken('employeeapptoken')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token]);
}

}   
