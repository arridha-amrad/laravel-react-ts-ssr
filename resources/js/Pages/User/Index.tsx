import UsersTable from "@/Components/UsersTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TAuthUser } from "@/types";
import { Head } from "@inertiajs/react";

type Props = {
  users: TAuthUser[];
};

export default function Index({ users }: Props) {
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
        <UsersTable users={users} />
      </div>
    </AuthenticatedLayout>
  );
}
