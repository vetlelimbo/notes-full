"use client";
import Link from "next/link";
import { deleteNoteAction } from "../actions/dbactions";

export default function NoteCard({
  noteId,
  userId,
  title,
  description,
}: {
  noteId: number;
  userId: string;
  title: string;
  description: string;
}) {
  async function handleDelete() {
    try {
      const response = await deleteNoteAction(noteId, userId);
      if (!response.success) {
        throw new Error("Error " + response.error);
      }
    } catch (err) {
      console.error("Something went wrong deleting note: " + err);
    }
  }
  return (
    <div className="text-white bg-zinc-900 border-zinc-800 text-center rounded-md p-6 border flex flex-col items-center min-h-80 gap-5 relative">
      <div className="flex items-center">
        <h2 className="text-white text-lg max-w-50">{title}</h2>
        <div onClick={handleDelete} className="absolute right-5 cursor-pointer">
          ❌
        </div>
      </div>
      <p className="text-zinc-600 text-md bg-white p-3 rounded-sm min-h-40 w-full">
        {description}
      </p>
      <Link
        href={`/dashboard/edit/${noteId}`}
        className="text-white bg-black border-zinc-300 border text-sm px-6 py-1 rounded-md mt-auto"
      >
        Edit
      </Link>
    </div>
  );
}
