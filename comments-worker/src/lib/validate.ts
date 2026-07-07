const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,199}$/;

export type ValidSubmission = {
  slug: string;
  author_name: string | null;
  body: string;
  turnstile_token: string;
  website: string;
  form_started_at: number;
};

export type ValidationResult =
  | { ok: true; data: ValidSubmission }
  | { ok: false; message: string };

export function validateSubmission(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, message: "Request body must be a JSON object" };
  }
  const raw = input as Record<string, unknown>;

  const slug = typeof raw.slug === "string" ? raw.slug.trim() : "";
  if (!SLUG_RE.test(slug)) {
    return { ok: false, message: "Invalid slug" };
  }

  const body = typeof raw.body === "string" ? raw.body.trim() : "";
  if (body.length < 2 || body.length > 4000) {
    return { ok: false, message: "Comment must be between 2 and 4000 characters" };
  }

  const name = typeof raw.author_name === "string" ? raw.author_name.trim() : "";
  if (name.length > 50) {
    return { ok: false, message: "Name must be 50 characters or fewer" };
  }

  const turnstileToken =
    typeof raw.turnstile_token === "string" ? raw.turnstile_token : "";
  if (!turnstileToken) {
    return { ok: false, message: "Missing Turnstile token" };
  }

  return {
    ok: true,
    data: {
      slug,
      author_name: name || null,
      body,
      turnstile_token: turnstileToken,
      website: typeof raw.website === "string" ? raw.website : "",
      form_started_at:
        typeof raw.form_started_at === "number" ? raw.form_started_at : 0,
    },
  };
}
