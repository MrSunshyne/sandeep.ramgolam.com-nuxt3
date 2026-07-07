import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import { bearerAuth } from "./middleware/auth";
import { publicRoutes } from "./routes/public";
import { adminRoutes } from "./routes/admin";

const ALLOWED_ORIGINS = ["https://sandeep.ramgolam.com", "http://localhost:4242"];

const app = new Hono<{ Bindings: Env }>();

const corsMiddleware = cors({
  origin: ALLOWED_ORIGINS,
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
  maxAge: 86400,
});
// Registered before routes so preflights and 4xx error responses carry CORS
// headers. Admin routes intentionally get no CORS — they are curl/agent only.
app.use("/api/comments", corsMiddleware);
app.use("/api/comments/*", corsMiddleware);

app.use("/api/admin/*", bearerAuth);

app.get("/", (c) => c.json({ name: "comments-worker", ok: true }));

app.route("/api", publicRoutes);
app.route("/api/admin", adminRoutes);

app.notFound((c) => c.json({ error: "not_found", message: "No such endpoint" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal", message: "Something went wrong" }, 500);
});

export default app;
