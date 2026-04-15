import { integer, timestamp, text, pgTable } from "drizzle-orm/pg-core";

export const note = pgTable("note", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Note = typeof note.$inferSelect; // read type
export type NewNote = typeof note.$inferInsert; // write type
