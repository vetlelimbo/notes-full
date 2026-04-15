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
    redirect("/sigin");
  }

  const response = await getNotes(session?.user.id); //TODO: why do I have the question mark here? I check it

  if (!response.success) {
    return { success: false, error: response.error };
  }

  return { success: true, data: response.data };
}

export default async function DashboardPage() {
  const fetcheData = await fetchNotes();

  if (!fetcheData.success) {
    console.error("Something went wrong getting notes: " + fetcheData.error);
    return;
  }

  const { data } = fetcheData;

  return <DashboardClient notes={data as Note[]} />;
}
