"use server";

import { db } from "@/lib/db/drizzle";
import { note } from "@/lib/db/schema";

export async function createNote() {
    await db.insert(note).
}
