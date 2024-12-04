import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TFeature } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Props = {
  feature: TFeature;
};

const Edit = ({ feature }: Props) => {
  const { data, setData, put, errors, processing } = useForm({
    name: feature.name,
    description: feature.description,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("feature.update", feature), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Feature
        </h2>
      }
    >
      <Head title="Edit Feature" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <form
            onSubmit={submit}
            className="bg-white p-4 space-y-3 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800"
          >
            <div>
              <InputLabel htmlFor="name" value="name" />
              <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                isFocused
                autoComplete="name"
              />
              <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
              <InputLabel htmlFor="description" value="description" />
              <TextareaInput
                id="description"
                className="mt-1 block w-full"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                required
                autoComplete="description"
              />
              <InputError className="mt-2" message={errors.description} />
            </div>
            <PrimaryButton disabled={processing}>Update</PrimaryButton>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
