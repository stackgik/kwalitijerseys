import { defineConfig } from "drizzle-kit";

console.log(process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./app/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
