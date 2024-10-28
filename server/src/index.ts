import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { taskTable } from "./db/schema";
import { eq } from "drizzle-orm";

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
  .group("/api", (app) =>
    app.group("/task", (app) =>
      app
        .get("all", () => {
          return db.select().from(taskTable);
        })
        .post(
          "create",
          async ({ body }) => {
            await db.insert(taskTable).values(body);
          },
          {
            body: t.Object({
              title: t.String(),
            }),
          }
        )
        .put(
          "update",
          async ({ body }) => {
            await db
              .update(taskTable)
              .set(body)
              .where(eq(taskTable.id, body.id));
          },
          {
            body: t.Object({
              id: t.Number(),
              title: t.Optional(t.String()),
              completedOn: t.Union([t.Date(), t.Null()]), // Allows `Date` or `null`
            }),
          }
        )
    )
  )

  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
