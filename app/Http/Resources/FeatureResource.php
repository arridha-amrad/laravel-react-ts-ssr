<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => $this->created_at->format('Y-m-d H:i:s'),
            'user' => new UserResource($this->user),
            'upvoteCount' => $this->upvote_count ?? 0,
            'userHasUpVoted' => $this->user_has_upvoted,
            'userHasDownVoted' => $this->user_has_downvoted,
            'totalVoters' => $this->total_voters,
            'comments' => $this->comments->map(function($comment){
                return [
                    'id' => $comment->id,
                    'comment' => $comment->comment,
                    'createdAt' => $comment->created_at,
                    'user' => new UserResource($comment->user)
                ];
            })
        ];
    }
}
