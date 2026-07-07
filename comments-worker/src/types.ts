export type RateLimiter = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

export type Env = {
  DB: D1Database;
  POST_RATE_LIMITER: RateLimiter;
  ADMIN_TOKEN: string;
  TURNSTILE_SECRET: string;
  IP_HASH_SALT: string;
  DISCORD_WEBHOOK_URL?: string;
};

export type CommentStatus = "pending" | "approved" | "spam";

export type CommentRow = {
  id: number;
  slug: string;
  author_name: string | null;
  body: string;
  status: CommentStatus;
  parent_id: number | null;
  ip_hash: string;
  user_agent: string | null;
  created_at: string;
};

// Mirrors PublicComment / CommentSubmission in the site's types/index.ts.
// Kept duplicated on purpose: this package has an isolated tsconfig and the
// README API contract is the source of truth.
export type PublicComment = {
  id: number;
  author_name: string;
  body: string;
  parent_id: number | null;
  created_at: string;
};
