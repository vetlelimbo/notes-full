"use server";

import { db } from "@/lib/db/drizzle";
import { eq, and, desc } from "drizzle-orm";
import { NewNote, note } from "@/lib/db/schema";
import * as z from "zod";

const zNote = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const upateNoteParse = z.object({
  userId: z.string().min(1),
  noteId: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function createNote(newNote: NewNote) {
  const parsedNote = zNote.safeParse(newNote); // TODO: Figure out how to get nice errors, this was pain to handle

  if (!parsedNote.success) {
    return { success: false, error: parsedNote.error.format() };
  }

  try {
    await db.insert(note).values({
      userId: parsedNote.data.userId,
      title: parsedNote.data.title,
      description: parsedNote.data.description,
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function getNotes(userId: string) {
  try {
    const data = await db.select().from(note).where(eq(note.userId, userId));
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function getNote(userId: string, noteId: number) {
  try {
    const userNote = await db
      .select()
      .from(note)
      .where(and(eq(note.id, noteId), eq(note.userId, userId)));

    return { success: true, data: userNote };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function updateNote(
  userId: string,
  noteId: number,
  title: string,
  description: string,
) {
  try {
    const parsedUpdate = upateNoteParse.safeParse({
      userId,
      noteId,
      title,
      description,
    });

    if (!parsedUpdate.success) {
      throw new Error("Failed to parse: " + parsedUpdate.error.format());
    }

    await db
      .update(note)
      .set({
        title: parsedUpdate.data.title,
        description: parsedUpdate.data.description,
      })
      .where(and(eq(note.userId, userId), eq(note.id, noteId)));

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
