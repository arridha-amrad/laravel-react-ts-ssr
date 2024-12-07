import CommentItem from "@/Components/CommentItem";
import FeatureItem from "@/Components/FeatureItem";
import NewCommentForm from "@/Components/NewCommentForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TFeature } from "@/types";
import { Head } from "@inertiajs/react";

type Props = {
  feature: TFeature;
};

const Show = ({ feature }: Props) => {
  console.log(feature);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {feature.name}
        </h2>
      }
    >
      <Head title={"Feature " + feature.name} />
      <FeatureItem feature={feature} />
      <NewCommentForm feature={feature} />
      <div className="flex flex-col gap-4 py-6">
        {feature.comments.map((v) => (
          <CommentItem comment={v} key={v.id} />
        ))}
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
