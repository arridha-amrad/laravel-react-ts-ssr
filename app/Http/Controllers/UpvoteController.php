<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Upvote;
use Auth;
use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    public function store(Request $request, Feature $feature)
    {

        $data = $request->validate([
            'vote' => ['required', 'boolean']
        ]);

        Upvote::updateOrCreate(
            ['feature_id' => $feature->id, 'user_id' => Auth::id()],
            ['upvote' => $data['vote']]
        );

        return back();
    }

    public function destroy(Feature $feature)
    {

        $feature->upvotes()->where('user_id', Auth::id())->delete();

        return back();
    }
}
