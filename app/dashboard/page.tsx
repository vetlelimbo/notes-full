import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getNotes } from "../actions/dbactions";
import NoteCard from "../components/NoteCard";

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

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-4 gap-4">
        {data.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
          />
        ))}
      </div>
    </div>
  );
}
