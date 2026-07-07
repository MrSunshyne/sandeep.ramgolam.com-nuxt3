import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Env } from "./types";
import { bearerAuth } from "./middleware/auth";
import { publicRoutes } from "./routes/public";
import { adminRoutes } from "./routes/admin";
import { ADMIN_HTML } from "./admin-page";

const ALLOWED_ORIGINS = ["https://sandeep.ramgolam.com", "http://localhost:4242"];

const app = new Hono<{ Bindings: Env }>();

// Registered before routes (and before auth) so preflights and 4xx error
// responses carry CORS headers. Admin routes are CORS-enabled too so the blog
// can show the pending queue to a logged-in admin — the bearer token is the
// security boundary, not CORS.
app.use(
  "/api/*",
  cors({
    origin: ALLOWED_ORIGINS,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use("/api/admin/*", bearerAuth);

app.get("/", (c) => c.json({ name: "comments-worker", ok: true }));

// Static dashboard shell — holds no data; every request it makes goes through
// the bearer-auth /api/admin/* endpoints.
app.get("/admin", (c) => c.html(ADMIN_HTML));

app.route("/api", publicRoutes);
app.route("/api/admin", adminRoutes);

app.notFound((c) => c.json({ error: "not_found", message: "No such endpoint" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal", message: "Something went wrong" }, 500);
});

export default app;
