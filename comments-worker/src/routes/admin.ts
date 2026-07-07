import { Hono } from "hono";
import type { Context } from "hono";
import type { CommentRow, CommentStatus, Env } from "../types";

const STATUSES: CommentStatus[] = ["pending", "approved", "spam"];
const IP_HASH_RE = /^[0-9a-f]{64}$/;

export const adminRoutes = new Hono<{ Bindings: Env }>();

adminRoutes.get("/comments", async (c) => {
  const status = c.req.query("status") ?? "pending";
  if (!STATUSES.includes(status as CommentStatus)) {
    return c.json(
      { error: "validation_failed", message: "status must be pending, approved or spam" },
      400,
    );
  }
  const slug = c.req.query("slug");
  const limit = Math.min(Number(c.req.query("limit")) || 50, 200);
  const offset = Number(c.req.query("offset")) || 0;

  const query = slug
    ? c.env.DB.prepare(
        `SELECT * FROM comments WHERE status = ?1 AND slug = ?2
         ORDER BY created_at ASC, id ASC LIMIT ?3 OFFSET ?4`,
      ).bind(status, slug, limit, offset)
    : c.env.DB.prepare(
        `SELECT * FROM comments WHERE status = ?1
         ORDER BY created_at ASC, id ASC LIMIT ?2 OFFSET ?3`,
      ).bind(status, limit, offset);

  const { results } = await query.all<CommentRow>();
  return c.json({ count: results.length, comments: results });
});

async function setStatus(c: Context<{ Bindings: Env }>, status: CommentStatus) {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare(
    "UPDATE comments SET status = ?1 WHERE id = ?2 RETURNING id",
  )
    .bind(status, id)
    .first<{ id: number }>();
  if (!row) {
    return c.json({ error: "not_found", message: `No comment with id ${id}` }, 404);
  }
  return c.json({ id: row.id, status });
}

adminRoutes.post("/comments/:id/approve", (c) => setStatus(c, "approved"));
adminRoutes.post("/comments/:id/spam", (c) => setStatus(c, "spam"));

adminRoutes.delete("/comments/:id", async (c) => {
  const id = c.req.param("id");
  // Deleting a top-level comment takes its replies with it.
  const res = await c.env.DB.prepare(
    "DELETE FROM comments WHERE id = ?1 OR parent_id = ?1",
  )
    .bind(id)
    .run();
  if (res.meta.changes === 0) {
    return c.json({ error: "not_found", message: `No comment with id ${id}` }, 404);
  }
  return c.json({ id: Number(id), deleted: true });
});

adminRoutes.get("/bans", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT ip_hash, reason, created_at FROM bans ORDER BY created_at DESC",
  ).all();
  return c.json({ bans: results });
});

adminRoutes.post("/bans", async (c) => {
  let body: Record<string, unknown>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "validation_failed", message: "Request body must be JSON" }, 400);
  }
  const ipHash = typeof body.ip_hash === "string" ? body.ip_hash.trim() : "";
  if (!IP_HASH_RE.test(ipHash)) {
    return c.json(
      { error: "validation_failed", message: "ip_hash must be a 64-character hex string" },
      400,
    );
  }
  const reason = typeof body.reason === "string" ? body.reason : null;
  await c.env.DB.prepare(
    `INSERT INTO bans (ip_hash, reason) VALUES (?1, ?2)
     ON CONFLICT(ip_hash) DO UPDATE SET reason = excluded.reason`,
  )
    .bind(ipHash, reason)
    .run();
  return c.json({ ip_hash: ipHash, banned: true }, 201);
});

adminRoutes.delete("/bans/:ipHash", async (c) => {
  const ipHash = c.req.param("ipHash");
  await c.env.DB.prepare("DELETE FROM bans WHERE ip_hash = ?1").bind(ipHash).run();
  return c.json({ ip_hash: ipHash, banned: false });
});
