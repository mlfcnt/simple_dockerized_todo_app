import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { taskTable } from "./db/schema";

const db = drizzle(process.env.DB_FILE_NAME!);

const app = new Elysia()
  .use(
    cors({
      origin: "*",
    })
  )
  .get("/healthcheck", () => ({
    status: "ok",
  }))
  .get("/", () => ({
    greeting: "Hello, from the server!",
  }))
  .group("/task", (app) =>
    app
      .get("all", () => {
        return db.select().from(taskTable);
      })
      .get("create", async (req) => {
        const newTask: typeof taskTable.$inferInsert = {
          name: `FAKE_TASK_${new Date().getTime()}`,
        };
        await db.insert(taskTable).values(newTask);
      })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
