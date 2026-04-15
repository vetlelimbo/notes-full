"use client";
import Link from "next/link";

export default function NoteCard({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-white bg-zinc-900 border-zinc-800 text-center rounded-md p-6 border flex flex-col items-center min-h-80 gap-5">
      <h2 className="text-white text-lg">{title}</h2>
      <p className="text-zinc-600 text-md bg-white p-3 rounded-sm min-h-40 w-full">
        {description}
      </p>
      <Link
        href={`/dashboard/edit/${id}`}
        className="text-white bg-black border-zinc-300 border text-sm px-6 py-1 rounded-md mt-auto"
      >
        Edit
      </Link>
    </div>
  );
}
