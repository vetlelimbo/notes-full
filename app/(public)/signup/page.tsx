import { redirect } from "next/navigation";
import { signUpAction } from "../../actions/auth";
import { auth } from "@/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    try {
      const response = await signUpAction(formData);

      if (!response.success) {
        throw new Error("Error:" + response.error);
      }
    } catch (err) {
      console.error("Something went wrong: " + err);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-6">
        <Link href={"/"} className="text-white hover:underline mb-8">
          ← Back to Home
        </Link>
      </div>
      <div className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-6 rounded-lg">
        <h2 className="text-white font-semibold text-xl text-center mb-6">
          Sign Up
        </h2>
        <form action={handleSubmit}>
          <label className="text-zinc-500 block mb-3 text-lg" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email..."
            className="bg-white placeholder:text-zinc-800 text-black p-2 rounded-md w-full"
          ></input>
          <div className="h-px bg-zinc-800 mt-10 mb-5"></div>
          <label className="text-zinc-500 block mb-3 text-lg" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name..."
            className="bg-white placeholder:text-zinc-800 text-black p-2 rounded-md w-full"
          ></input>
          <div className="h-px bg-zinc-800 mt-10 mb-5"></div>
          <label
            className="text-zinc-500 block mb-3 text-lg"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password..."
            className="bg-white placeholder:text-zinc-800 text-black p-2 rounded-md w-full"
          ></input>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-50 text-zinc-900 px-6 py-1 rounded-md mt-12 text-lg hover:bg-orange-100 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
