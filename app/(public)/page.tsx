import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-5xl mx-auto w-full space-y-30">
      <section>
        <div>
          <h1 className="text-white text-3xl text-center mb-3">
            Get Started With Limbo Notes
          </h1>
          <p className="text-zinc-500 text-center max-w-200 mx-auto text-lg mb-10">
            Elevate your notes with Limbo Notes. Create, store and edit your
            notes freely when you feel like it. Storing notes have never been
            more pleasureable and fun.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link
              href={"/signup"}
              className="bg-white text-black text-md px-8 py-2 rounded-md cursor-pointer hover:bg-orange-50"
            >
              Sign Up
            </Link>
            <Link
              href={"/signin"}
              className="text-white px-8 py-2 rounded-md cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="">
        <div className="h-px bg-zinc-800 mb-20 w-8/10 mx-auto"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 flex flex-col items-center p-4 rounded-lg hover:border-zinc-700">
            <h2 className="text-white font-semibold text-lg">Easy</h2>
            <p className="text-zinc-500 text-md text-center">
              Making notes have never been easier. Just type away at your
              keyboard and store them. God if all things would have been this
              easy the world would be a better place
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 flex flex-col items-center p-4 rounded-lg hover:border-zinc-700">
            <h2 className="text-white font-semibold text-lg">Reliable</h2>
            <p className="text-zinc-500 text-md text-center">
              All notes stored safely away in my database. I know exactly what
              I'm doing and you should not have to worry about any data breahes.
              Your secret notes are safe with me.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 flex flex-col items-center p-4 rounded-lg hover:border-zinc-700">
            <h2 className="text-white font-semibold text-lg">Not Free</h2>
            <p className="text-zinc-500 text-md text-center">
              All good things in life comes with a hefty price, and so does
              Limbo Notes. Do not feel discouraged by the high price, its only a
              reflection of its internal value to you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
