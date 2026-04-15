"use client";
import { Note } from "@/lib/db/schema";
import NoteCard from "./NoteCard";
import { useState } from "react";

export default function DashboardClient({ notes }: { notes: Note[] }) {
  const [search, setSearch] = useState("");
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="max-w-5/10 mx-auto mb-12">
        <input
          type="text"
          className="bg-white p-2 rounded-md w-full placeholder:text-zinc-600 text-black"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredNotes.map((note) => (
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
