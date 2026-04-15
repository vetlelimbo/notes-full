"use client";

import { Note } from "@/lib/db/schema";
import { useState } from "react";
import { updateNote } from "../actions/dbactions";
import { redirect } from "next/navigation";

export default function EditClient({ note }: { note: Note }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  //TODO: I am using server action inside of client component. When would I ever need to use a auth client? or db API?
  async function handleNoteEdit(e: React.FormEvent) {
    e.preventDefault();
    const response = await updateNote(note.userId, note.id, title, description); //TODO: a refactor could be appropraite here getting the userId directly in server action

    if (!response.success) {
      console.error("Something went wrong: " + response.error);
      setTitle(note.title);
      setDescription(note.description);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <div className="text-white max-w-2xl mx-auto w-full border border-zinc-800 p-6 rounded-lg">
      <h2 className="text-white text-xl text-center">Update Note</h2>
      <form onSubmit={handleNoteEdit}>
        <label htmlFor="title" className="text-white text-lg block mb-2">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="bg-white w-full p-2 rounded-md text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label
          htmlFor="description"
          className="text-white text-lg block mt-5 mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          className="bg-white w-full p-2 rounded-md text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-white text-black text-lg px-6 py-1 rounded-md cursor-pointer hover:bg-orange-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
