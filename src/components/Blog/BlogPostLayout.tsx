'use client';

import React from 'react';
import Image from 'next/image';

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

interface Props {
  frontmatter: PostFrontmatter;
  children: React.ReactNode;
}

export default function BlogPostLayout({ frontmatter, children }: Props) {
  const { title, date, category, thumbnail } = frontmatter;

  return (
    <PostWrap>
      {thumbnail && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxHeight: '40rem',
            borderRadius: '1.2rem',
            overflow: 'hidden',
            aspectRatio: '16/9',
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
      <PostContent>{children}</PostContent>
    </PostWrap>
  );
}
