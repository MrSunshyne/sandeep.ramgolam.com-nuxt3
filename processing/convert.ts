// @ts-expect-error
import { promises as fsPromises } from 'fs';
// @ts-expect-error
import { fileURLToPath } from 'url';
// @ts-expect-error
import { dirname, join } from 'path';
// @ts-expect-error
import Turndown from 'turndown';
// @ts-expect-error
import * as yaml from 'yaml';

interface BlogPost {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  mobiledoc: any;
  html: string;
  comment_id: number;
  plaintext: string;
  feature_image: string;
  featured: boolean;
  type: string;
  status: string;
  locale: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string;
  codeinjection_head: string;
  codeinjection_foot: string;
  custom_template: string;
  canonical_url: string;
  email_recipient_filter: string;
  newsletter_id: string;
  lexical: string;
  show_title_and_feature_image: boolean;
}

interface File {
    posts: BlogPost[];
}

// @ts-expect-error
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function convertHtmlToMarkdown(html: string): string {
    // Implement HTML to Markdown conversion logic here
    // You can use a library like 'turndown' or 'showdown'
    // Example using 'turndown':
    const turndownConfig = {
        headingStyle: 'atx',
    }
    const turndownService = new Turndown(turndownConfig);
    return turndownService.turndown(html);
  
    // For simplicity, let's assume a basic conversion
    return html;
  }

async function convertToMarkdown(post: BlogPost): Promise<string> {
  const markdownContent = convertHtmlToMarkdown(post.html);

  const frontmatter = yaml.stringify({
    id: post.id,
    uuid: post.uuid,
    title: post.title,
    slug: post.slug,
    comment_id: post.comment_id,
    feature_image: post.feature_image,
    featured: post.featured,
    type: post
indexable: true.type,
    status: post.status,
    locale: post.locale,
    visibility: post.visibility,
    created_at: post.created_at,
    updated_at: post.updated_at,
    published_at: post.published_at,
    custom_excerpt: post.custom_excerpt,
    codeinjection_head: post.codeinjection_head,
    codeinjection_foot: post.codeinjection_foot,
    custom_template: post.custom_template,
    canonical_url: post.canonical_url,
    email_recipient_filter: post.email_recipient_filter,
    newsletter_id: post.newsletter_id,
    lexical: post.lexical,
    show_title_and_feature_image: post.show_title_and_feature_image,
  });
    return `---\n${frontmatter}\n---\n\n${markdownContent}`;
}

async function exportToMarkdown(posts: BlogPost[]): Promise<void> {
  await Promise.all(
    posts.map(async (post) => {
        const fileName = `${post.slug}.md`;
        
        const filePath = join(__dirname, '..', 'content', fileName);
        const markdownContent = await convertToMarkdown(post);

        await fsPromises.writeFile(filePath, markdownContent);

        console.log(`Exported ${fileName}`);
    })
  );
}

async function deleteMarkdownFiles(directoryPath: string): Promise<void> {
    try {
        const files = await fsPromises.readdir(directoryPath);
        const markdownFiles = files.filter((file) => file.endsWith('.md'));

        await Promise.all(
            markdownFiles.map(async (file) => {
                const filePath = join(directoryPath, file);
                await fsPromises.unlink(filePath);
                console.log(`Deleted ${file}`);
            })
        );

        console.log('All .md files deleted successfully.');
    } catch (error) {
        console.error('Error deleting .md files:', error);
    }
}

async function readPostsFromFile(filePath: string): Promise<File> {
  const data = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function main() {
    await deleteMarkdownFiles('../content/*.md');
  const postsFilePath = join(__dirname,'../', 'legacy', 'clean.json');
  const blogPosts: File = await readPostsFromFile(postsFilePath)
  await exportToMarkdown(blogPosts.posts);
}

// Run the main function
main();
