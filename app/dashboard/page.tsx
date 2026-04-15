import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-4"></div>
    </div>
  );
}
