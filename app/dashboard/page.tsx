import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getNotes } from "../actions/dbactions";
import DashboardClient from "../components/DashboardClient";
import { Note } from "@/lib/db/schema";

async function fetchNotes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const response = await getNotes(session.user.id);

  if (!response.success) {
    return { success: false, error: response.error };
  }

  return { success: true, data: response.data };
}

export default async function DashboardPage() {
  const fetchedData = await fetchNotes();

  if (!fetchedData.success) {
    console.error("Something went wrong getting notes: " + fetchedData.error);
    return;
  }

  const { data } = fetchedData;

  return <DashboardClient notes={data as Note[]} />;
}
