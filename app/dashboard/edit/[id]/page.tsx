import { getNote } from "@/app/actions/dbactions";
import EditClient from "@/app/components/EditClient";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function fetchNote(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const response = await getNote(session.user.id, Number(id));

  if (!response.success || !response.data) {
    return { success: false, error: response.error };
  }

  return { success: true, data: response.data };
}

export default async function EditNote({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetchNote(id);

  if (!response.success) {
    console.error(
      "Something went wrong getting note. Error: " + response.error,
    );
  }

  const note = response.data[0];

  return <EditClient note={note} />;
}
