import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { CategoryItem, Post, PostFrontmatter } from '@/typings/typings';

const contentDir = path.join(process.cwd(), 'content');

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const filepath = path.join(contentDir, `${slug}.md`);
    const fileContents = fs.readFileSync(filepath, 'utf8');
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const rawThumbnail = data.thumbnail as string | undefined;
    const thumbnail = rawThumbnail?.startsWith('/')
      ? rawThumbnail
      : rawThumbnail
        ? `/images/posts/${path.basename(rawThumbnail)}`
        : null;

    const frontmatter: PostFrontmatter = {
      title: String(data.title || ''),
      summary: String(data.summary || ''),
      date: String(data.date || ''),
      category: Array.isArray(data.category)
        ? data.category
        : data.category
          ? [String(data.category)]
          : [],
      thumbnail,
    };

    return { slug, frontmatter, content, readingTime };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map(slug => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) =>
      a.frontmatter.date < b.frontmatter.date ? 1 : -1,
    );
}

export function getAllCategories(): CategoryItem[] {
  const map = new Map<string, number>();
  getAllPosts().forEach(post => {
    post.frontmatter.category.forEach(cat => {
      map.set(cat, (map.get(cat) ?? 0) + 1);
    });
  });
  return Array.from(map.entries()).map(([fieldValue, totalCount]) => ({
    fieldValue,
    totalCount,
  }));
}
