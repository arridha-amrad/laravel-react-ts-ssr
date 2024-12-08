<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Auth;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $request->validate([
            'comment' => ['required', 'string']
        ]);

        $comment = new Comment();
        $comment->user_id = Auth::id();
        $comment->feature_id = $feature->id;
        $comment->comment = $request->comment;
        $comment->save();

        return to_route('feature.show', $feature);
    }

    public function destroy(Comment $comment)
    {

        $comment->delete();

        return to_route('feature.show', $comment->feature_id);
    }
}
