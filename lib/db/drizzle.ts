import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!); // connection to db with drizzle wrapper  allowing for query building funcionality instead of using plain sql
