import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="bg-zinc-950 border-b border-zinc-800 mb-15">
      {/* TODO create the server action for logut and put inside of action attribute*/}
      <form className="max-w-9/10 flex justify-between mx-auto py-4 items-center">
        <p className="text-white text-xl">Limbo Notes</p>
        {session ? (
          <button
            type="submit"
            className="text-black bg-orange-50 cursor-pointer px-6 py-1 rounded-md hover:bg-orange-100"
          >
            Log out
          </button>
        ) : (
          <Link
            href={"/signin"}
            className="text-black bg-orange-50 cursor-pointer px-6 py-1 rounded-md hover:bg-orange-100"
          >
            Sign in
          </Link>
        )}
      </form>
    </div>
  );
}
