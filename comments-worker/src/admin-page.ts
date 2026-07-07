// Single-file admin dashboard served at /admin. Contains no data itself —
// everything is fetched same-origin from /api/admin/* with the bearer token
// the moderator pastes once (kept in localStorage).
export const ADMIN_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Blog Comments Admin</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f8fafc; --card: #ffffff; --text: #0f172a; --muted: #64748b;
    --border: #e2e8f0; --accent: #16a34a; --danger: #dc2626; --warn: #d97706;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0f172a; --card: #1e293b; --text: #e2e8f0; --muted: #94a3b8; --border: #334155; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text);
    font: 15px/1.5 system-ui, -apple-system, sans-serif; }
  .wrap { max-width: 760px; margin: 0 auto; padding: 1.5rem 1rem 4rem; }
  header { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
  h1 { font-size: 1.3rem; margin: 0 0 1rem; }
  nav { display: flex; gap: .5rem; margin: 1rem 0; flex-wrap: wrap; }
  nav button { border: 1px solid var(--border); background: var(--card); color: var(--text);
    border-radius: 999px; padding: .4rem 1rem; cursor: pointer; font: inherit; }
  nav button.active { border-color: var(--accent); color: var(--accent); font-weight: 700; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: .75rem;
    padding: 1rem; margin-bottom: .75rem; }
  .meta { display: flex; gap: .6rem; flex-wrap: wrap; align-items: baseline;
    font-size: .85rem; color: var(--muted); margin-bottom: .4rem; }
  .meta b { color: var(--text); font-size: 1rem; }
  .meta a { color: var(--muted); }
  .body { white-space: pre-line; overflow-wrap: anywhere; margin: 0 0 .75rem; }
  .actions { display: flex; gap: .5rem; flex-wrap: wrap; }
  .actions button { border: 1px solid var(--border); background: transparent; color: var(--text);
    border-radius: .5rem; padding: .3rem .8rem; cursor: pointer; font: inherit; font-size: .85rem; }
  .actions button:hover { border-color: currentColor; }
  .approve { color: var(--accent); } .spam { color: var(--warn); }
  .del, .ban { color: var(--danger); }
  .empty, .error { color: var(--muted); padding: 2rem 0; text-align: center; }
  .error { color: var(--danger); }
  #login { max-width: 420px; margin: 15vh auto 0; text-align: center; }
  #login input { width: 100%; padding: .6rem .8rem; border-radius: .5rem;
    border: 1px solid var(--border); background: var(--card); color: var(--text); font: inherit; }
  #login button { margin-top: .8rem; padding: .5rem 1.5rem; border-radius: 999px;
    border: 1px solid var(--accent); background: var(--accent); color: #fff;
    font: inherit; font-weight: 700; cursor: pointer; }
  .linkish { background: none; border: none; color: var(--muted); cursor: pointer;
    font: inherit; font-size: .85rem; text-decoration: underline; padding: 0; }
  .hash { font-family: ui-monospace, monospace; font-size: .78rem; }
</style>
</head>
<body>
<div class="wrap">
  <div id="login" hidden>
    <h1>Blog Comments Admin</h1>
    <p>Paste the admin token (stored only in this browser).</p>
    <input id="token-input" type="password" placeholder="admin token" autocomplete="off">
    <br><button id="login-btn">Unlock</button>
    <p id="login-error" class="error" hidden>That token was rejected.</p>
  </div>

  <div id="app" hidden>
    <header>
      <h1>Blog Comments Admin</h1>
      <button class="linkish" id="logout">forget token</button>
    </header>
    <nav id="tabs"></nav>
    <div id="list"></div>
  </div>
</div>

<script>
"use strict";
const SITE_URL = "https://sandeep.ramgolam.com";
const TABS = ["pending", "approved", "spam", "bans"];
let token = localStorage.getItem("comments_admin_token") || "";
let tab = "pending";

const $ = (sel) => document.querySelector(sel);
const el = (t, cls, text) => {
  const n = document.createElement(t);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

async function api(path, { method = "GET", body } = {}) {
  const headers = { Authorization: "Bearer " + token };
  if (body) headers["Content-Type"] = "application/json";
  const res = await fetch("/api/admin" + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) { showLogin(true); throw new Error("unauthorized"); }
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function showLogin(rejected) {
  $("#app").hidden = true;
  $("#login").hidden = false;
  $("#login-error").hidden = !rejected;
}

async function unlock() {
  token = $("#token-input").value.trim();
  try {
    await api("/comments?limit=1");
    localStorage.setItem("comments_admin_token", token);
    $("#login").hidden = true;
    $("#app").hidden = false;
    load();
  } catch { /* 401 already re-showed the login form */ }
}

function renderTabs() {
  $("#tabs").replaceChildren(...TABS.map((t) => {
    const b = el("button", t === tab ? "active" : "", t);
    b.onclick = () => { tab = t; renderTabs(); load(); };
    return b;
  }));
}

function actionButton(label, cls, request, needsConfirm) {
  const b = el("button", cls, label);
  b.onclick = async () => {
    if (needsConfirm && !confirm(label + " — are you sure?")) return;
    try { await api(request.path, request); load(); }
    catch (e) { if (e.message !== "unauthorized") alert(label + " failed: " + e.message); }
  };
  return b;
}

function commentCard(c) {
  const card = el("div", "card");
  const meta = el("div", "meta");
  meta.append(el("b", "", c.author_name || "Anonymous"));
  const link = el("a", "", c.slug);
  link.href = SITE_URL + "/blog/" + c.slug;
  link.target = "_blank";
  meta.append(link, el("span", "", new Date(c.created_at).toLocaleString()));
  if (c.parent_id) meta.append(el("span", "", "\\u21b3 reply to #" + c.parent_id));
  meta.append(el("span", "hash", "ip:" + c.ip_hash.slice(0, 10) + "…"));
  card.append(meta, el("p", "body", c.body));

  const actions = el("div", "actions");
  if (c.status !== "approved")
    actions.append(actionButton("approve", "approve", { path: "/comments/" + c.id + "/approve", method: "POST" }));
  if (c.status !== "spam")
    actions.append(actionButton("spam", "spam", { path: "/comments/" + c.id + "/spam", method: "POST" }));
  actions.append(actionButton("delete", "del", { path: "/comments/" + c.id, method: "DELETE" }, true));
  actions.append(actionButton("ban IP", "ban", {
    path: "/bans", method: "POST",
    body: { ip_hash: c.ip_hash, reason: "banned from admin UI" },
  }, true));
  card.append(actions);
  return card;
}

function banCard(b) {
  const card = el("div", "card");
  const meta = el("div", "meta");
  meta.append(el("span", "hash", b.ip_hash));
  meta.append(el("span", "", (b.reason || "no reason") + " · " + new Date(b.created_at).toLocaleString()));
  const actions = el("div", "actions");
  actions.append(actionButton("unban", "approve", { path: "/bans/" + b.ip_hash, method: "DELETE" }));
  card.append(meta, actions);
  return card;
}

async function load() {
  const list = $("#list");
  list.replaceChildren(el("div", "empty", "Loading…"));
  try {
    if (tab === "bans") {
      const data = await api("/bans");
      list.replaceChildren(...(data.bans.length ? data.bans.map(banCard) : [el("div", "empty", "No bans.")]));
    } else {
      const data = await api("/comments?status=" + tab + "&limit=200");
      list.replaceChildren(...(data.comments.length ? data.comments.map(commentCard) : [el("div", "empty", "Nothing in " + tab + ".")]));
    }
  } catch (e) {
    if (e.message !== "unauthorized") list.replaceChildren(el("div", "error", "Failed to load: " + e.message));
  }
}

$("#login-btn").onclick = unlock;
$("#token-input").addEventListener("keydown", (e) => { if (e.key === "Enter") unlock(); });
$("#logout").onclick = () => { localStorage.removeItem("comments_admin_token"); token = ""; showLogin(false); };

renderTabs();
if (token) { $("#app").hidden = false; load(); }
else showLogin(false);
</script>
</body>
</html>`;
