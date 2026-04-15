"use client";

import { Note } from "@/lib/db/schema";

export default function EditClient({ note }: { note: Note }) {
  return (
    <div className="text-white">
      <p>{note.title}</p>
      <p>{note.description}</p>
    </div>
  );
}
