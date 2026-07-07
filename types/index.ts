// Mirrors the comments-worker API contract (comments-worker/README.md)
export type PublicComment = {
  id: number;
  author_name: string; // already coalesced to 'Anonymous' by the API
  body: string;
  parent_id: number | null; // one level of threading
  created_at: string; // ISO-8601
};

export type PublicCommentsResponse = {
  slug: string;
  count: number;
  comments: PublicComment[];
};

export type CommentSubmission = {
  slug: string;
  author_name?: string;
  body: string;
  turnstile_token: string;
  website: string; // honeypot — always ''
  form_started_at: number; // epoch ms of first form interaction
  parent_id?: number; // reply target (approved top-level comment)
};

export type BlogPost = {
  title: string;
  slug: string;
  feature_image: string;
  date: Date;
  custom_excerpt: string;
  featured: string | number;
  type: "post" | "page";
  indexable: boolean;
  status: "published" | "draft";
  visibility: "public" | "private";
};
