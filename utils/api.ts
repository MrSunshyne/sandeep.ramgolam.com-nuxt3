import type { PostOrPage } from "@tryghost/content-api";
import { api } from "./ghost-cli";
import { Memoize } from "~/utils/memoizer";

export async function getPosts() {
  let posts = await api.posts
    .browse({
      limit: "all",
      include: ["tags", "authors"],
    })
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      console.error(err);
    });

  return posts as PostOrPage[];
}

export function getPostsMemoized() {
  return Memoize(getPosts);
}

export async function getSinglePost(slug: string | number | undefined) {
  let posts = (await getPosts()) as PostOrPage[];
  let currentPost = posts.filter((post) => post.slug === slug)[0]
  return currentPost;
}

// Get posts by tag
export async function getPostsByTag(tagSlug: string) {
  let posts = (await getPosts()) as PostOrPage[];
  let postsByTag = posts.filter((post) => {
    let postTags = post.tags;
    if (!postTags) return false;
    let tags = postTags.map((tag) => tag.slug);
    return tags.includes(tagSlug);
  });
  return postsByTag;
}

// Get posts by author
export async function getPostsByAuthor(authorSlug: string) {
  let posts = (await getPosts()) as PostOrPage[];
  let postsByAuthor = posts.filter((post) => {
    let postAuthors = post.authors;
    if (!postAuthors) return false;
    let authors = postAuthors.map((author) => author.slug);
    return authors.includes(authorSlug);
  });
  return postsByAuthor;
}