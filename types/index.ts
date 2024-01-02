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
