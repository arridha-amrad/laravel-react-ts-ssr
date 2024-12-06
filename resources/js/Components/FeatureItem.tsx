import { TFeature } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import FeatureActionsDropdown from "@/Components/FeatureActionsDropdown";
import FeatureUpvoteDownvote from "@/Components/FeatureUpvoteDownvote";

export default function FeatureItem({ feature }: { feature: TFeature }) {
  console.log(feature);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
      <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
        <div>
          <FeatureUpvoteDownvote feature={feature} />
          {feature.totalVoters > 0 && (
            <div className="text-slate-500 text-xl flex gap-2 items-center justify-center text-center">
              <span>{feature.totalVoters}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl mb-2">
            <Link href={route("feature.show", feature)}>{feature.name}</Link>
          </h2>
          {(feature.description || "").length > 200 && (
            <>
              <p>
                {isExpanded
                  ? feature.description
                  : `${(feature.description || "").slice(0, 200)}...`}
              </p>

              <button
                onClick={toggleReadMore}
                className="text-amber-500 hover:underline"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          )}
          {(feature.description || "").length <= 200 && (
            <p>{feature.description}</p>
          )}

          <div className="py-4">
            <Link
              prefetch
              href={route("feature.index")}
              className="inline-flex gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Comments
            </Link>
          </div>
        </div>
        <div>
          <FeatureActionsDropdown feature={feature} />
        </div>
      </div>
    </div>
  );
}
