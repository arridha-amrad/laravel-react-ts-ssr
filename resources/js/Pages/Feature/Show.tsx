import FeatureItem from "@/Components/FeatureItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TFeature } from "@/types";
import { Head } from "@inertiajs/react";

type Props = {
  feature: TFeature;
};

const Show = ({ feature }: Props) => {
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
    </AuthenticatedLayout>
  );
};

export default Show;
