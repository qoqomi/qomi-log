import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import SEO from '@/components/Layout/SEO';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { PostFrontmatter } from '@/typings/typings';
import {
  CategoryTag,
  Divider,
  PostContent,
  PostDate,
  PostHeader,
  PostMeta,
  PostTitle,
  PostWrap,
} from '@/styles/post.style';

interface BlogPostProps {
  frontmatter: PostFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

function BlogPost({ frontmatter, mdxSource }: BlogPostProps) {
  const { title, summary, date, category, thumbnail } = frontmatter;

  return (
    <>
      <SEO title={title} description={summary} />
      <PostWrap>
        {thumbnail && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: '40rem',
              borderRadius: '1.2rem',
              overflow: 'hidden',
              aspectRatio: '16/7',
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        <PostHeader>
          <PostTitle>{title}</PostTitle>
          <PostMeta>
            <PostDate>{date}</PostDate>
            {category?.map(cat => (
              <CategoryTag key={cat}>{cat}</CategoryTag>
            ))}
          </PostMeta>
        </PostHeader>
        <Divider />
        <PostContent>
          <MDXRemote {...mdxSource} />
        </PostContent>
      </PostWrap>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string);
  if (!post) return { notFound: true };

  const mdxSource = await serialize(post.content ?? '', {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    props: {
      frontmatter: post.frontmatter,
      mdxSource,
    },
  };
};

export default BlogPost;
