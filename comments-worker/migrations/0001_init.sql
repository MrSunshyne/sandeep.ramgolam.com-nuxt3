-- Migration number: 0001 	 blog comments initial schema
CREATE TABLE comments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL,
  author_name TEXT,                          -- NULL = anonymous; public API coalesces to 'Anonymous'
  body        TEXT    NOT NULL CHECK (length(body) BETWEEN 2 AND 4000),
  status      TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','spam')),
  parent_id   INTEGER REFERENCES comments(id), -- reserved for threading; always NULL in v1
  ip_hash     TEXT    NOT NULL,               -- hex SHA-256(IP_HASH_SALT + ip)
  user_agent  TEXT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE INDEX idx_comments_slug_status ON comments (slug, status, created_at);
CREATE INDEX idx_comments_status      ON comments (status, created_at);
CREATE INDEX idx_comments_ip_hash     ON comments (ip_hash);

CREATE TABLE bans (
  ip_hash    TEXT PRIMARY KEY,
  reason     TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);
