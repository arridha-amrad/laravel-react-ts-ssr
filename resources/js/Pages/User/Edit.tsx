import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TAuthUser } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type Props = {
  user: TAuthUser;
  roles: Record<string, string>;
};

export default function Edit({ roles, user }: Props) {
  const { data, setData, processing, put } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles,
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("user.update", user), { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <InputLabel>Name</InputLabel>
                  <TextInput
                    className="w-full"
                    onChange={(e) => setData("name", e.target.value)}
                    value={data.name}
                  />
                </div>
                <div className="space-y-2">
                  <InputLabel>Email</InputLabel>
                  <TextInput
                    className="w-full"
                    onChange={(e) => setData("email", e.target.value)}
                    value={data.email}
                  />
                </div>
                <div className="space-y-2">
                  <InputLabel>Role</InputLabel>
                  {Object.entries(roles).map((role, i) => (
                    <div key={i} className="flex items-center mb-4">
                      <input
                        id={role[0]}
                        type="radio"
                        defaultChecked={user.roles.includes(
                          role[0].toLowerCase()
                        )}
                        value={role[1]}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setData("roles", [e.target.value.toLowerCase()]);
                          }
                        }}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={role[0]}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {role[1]}
                      </label>
                    </div>
                  ))}
                </div>
                <PrimaryButton type="submit" disabled={processing}>
                  Update
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
