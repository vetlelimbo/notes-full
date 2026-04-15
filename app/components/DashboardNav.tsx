import Link from "next/link";
import { signOutAction } from "../actions/auth";
import { redirect } from "next/navigation";

export default function DashboardNav() {
  async function handleLogout() {
    "use server";
    const response = await signOutAction();

    if (!response.success) {
      console.error(
        "Something went wrong when trying to log out: " + response.error,
      );
    }

    //TODO: This redirect does not route properly. Expect its because its contained in a separate layout.tsx file
    redirect("/");
  }

  return (
    <div className="bg-zinc-950 border-b border-zinc-800 mb-15">
      {/* TODO create the server action for logut and put inside of action attribute*/}
      <form
        onSubmit={handleLogout}
        className="max-w-9/10 flex justify-between mx-auto py-6 items-center"
      >
        <p className="text-white text-xl">Limbo Notes</p>
        <div className="flex gap-4">
          <Link
            href={"/dashboard"}
            className="bg-white text-black px-6 py-1 font-semibold rounded-sm cursor-pointer flex-1 text-nowrap"
          >
            All Notes
          </Link>
          <Link
            href={"/dashboard/createnote"}
            className="bg-white text-black px-6 py-1 font-semibold rounded-sm cursor-pointer flex-1 text-nowrap"
          >
            Create Note
          </Link>
        </div>
        <button
          type="submit"
          className="text-black bg-orange-50 cursor-pointer px-6 py-1 rounded-md hover:bg-orange-100"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
