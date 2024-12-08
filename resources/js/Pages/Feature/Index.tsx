import FeatureItem from "@/Components/FeatureItem";
import { can } from "@/helpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TFeature, TPaginated } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

type Props = {
  features: TPaginated<TFeature>;
};

export default function Index({ features }: Props) {
  const { user } = usePage().props.auth;
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Features
        </h2>
      }
    >
      <Head title="Features" />

      {can(user, "manage_features") && (
        <div className="pb-8">
          <Link
            className="px-4 py-2 bg-slate-500 text-slate-200 rounded"
            href={route("feature.create")}
          >
            Create New Feature
          </Link>
        </div>
      )}

      {features.data.map((feature) => (
        <FeatureItem feature={feature} key={feature.id} />
      ))}
    </AuthenticatedLayout>
  );
}
