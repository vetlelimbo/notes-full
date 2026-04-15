"use client";
import { Note } from "@/lib/db/schema";
import NoteCard from "./NoteCard";
import { useState } from "react";
import Link from "next/link";

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
      {notes.length === 0 ? (
        <div className="text-center">
          <p className="text-white text-3xl font-semibold text-center mb-1">
            You dont have any notes!
          </p>
          <Link
            href={"/dashboard/createnote"}
            className="text-white underline text-md text-center cursor-pointer"
          >
            Click here to create your first note →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteId={note.id}
              userId={note.userId}
              title={note.title}
              description={note.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
