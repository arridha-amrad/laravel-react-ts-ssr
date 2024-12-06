import { TFeature } from "@/types";
import { useForm } from "@inertiajs/react";

export default function FeatureUpvoteDownvote({
  feature: { upvoteCount, userHasDownVoted, userHasUpVoted, id },
}: {
  feature: TFeature;
}) {
  const isAlreadyVoted = userHasDownVoted || userHasUpVoted;

  const upVoteForm = useForm({
    vote: true,
  });

  const downVoteForm = useForm({
    vote: false,
  });

  const vote = (value: boolean) => {
    if ((userHasDownVoted && !value) || (userHasUpVoted && value)) {
      upVoteForm.delete(route("upvote.destroy", id), { preserveScroll: true });
    } else {
      let form: null | typeof upVoteForm = null;
      if (value) {
        form = upVoteForm;
      } else {
        form = downVoteForm;
      }
      form.post(route("upvote.store", id), { preserveScroll: true });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => vote(true)}
        className={userHasUpVoted ? "text-amber-600" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12"
        >
          <path
            fillRule="evenodd"
            d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span
        className={`text-2xl font-semibold ${
          isAlreadyVoted && "text-amber-500"
        }`}
      >
        {upvoteCount}
      </span>
      <button
        onClick={() => vote(false)}
        className={userHasDownVoted ? "text-amber-600" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
