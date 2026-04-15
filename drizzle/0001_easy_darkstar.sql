ALTER TABLE "note" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "note" ADD CONSTRAINT "note_userId_unique" UNIQUE("userId");