import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const taskTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  completed: int({ mode: "timestamp_ms" }),
});
