import type { MiddlewareHandler } from "hono";
import type { Env } from "../types";

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i]! ^ bb[i]!;
  return diff === 0;
}

export const bearerAuth: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  if (!token || !c.env.ADMIN_TOKEN || !timingSafeEqual(token, c.env.ADMIN_TOKEN)) {
    return c.json({ error: "unauthorized", message: "Valid bearer token required" }, 401);
  }
  await next();
};
