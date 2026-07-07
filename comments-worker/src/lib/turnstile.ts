const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteip?: string,
): Promise<boolean> {
  try {
    const form = new FormData();
    form.set("secret", secret);
    form.set("response", token);
    if (remoteip) form.set("remoteip", remoteip);

    const res = await fetch(SITEVERIFY_URL, { method: "POST", body: form });
    if (!res.ok) return false;

    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
