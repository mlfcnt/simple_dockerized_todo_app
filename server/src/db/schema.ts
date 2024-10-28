import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const taskTable = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  completedOn: int({ mode: "timestamp_ms" }),
});
