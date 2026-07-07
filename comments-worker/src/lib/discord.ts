type NotifyComment = {
  id: number;
  slug: string;
  author_name: string | null;
  body: string;
};

// Passed to ctx.waitUntil — must never reject or the runtime logs uncaught rejections.
export async function notifyDiscord(
  webhookUrl: string | undefined,
  apiOrigin: string,
  comment: NotifyComment,
): Promise<void> {
  if (!webhookUrl) return;

  const excerpt =
    comment.body.length > 200 ? `${comment.body.slice(0, 200)}…` : comment.body;
  const auth = '-H "Authorization: Bearer $ADMIN_TOKEN"';
  const content = [
    `💬 New pending comment #${comment.id} on **${comment.slug}**`,
    `From: ${comment.author_name ?? "Anonymous"}`,
    `> ${excerpt.replace(/\n/g, "\n> ")}`,
    "",
    `Approve: \`curl -X POST ${apiOrigin}/api/admin/comments/${comment.id}/approve ${auth}\``,
    `Spam: \`curl -X POST ${apiOrigin}/api/admin/comments/${comment.id}/spam ${auth}\``,
  ].join("\n");

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
  } catch {
    // Notification failures must never affect the comment submission.
  }
}
