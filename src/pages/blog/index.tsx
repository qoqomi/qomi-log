import styled from '@emotion/styled';
import React, { useState } from 'react';
import { GetStaticProps } from 'next';

import SEO from '@/components/Layout/SEO';
import PostItemList from '@/components/PostList/PostItemList';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { CategoryItem, Post } from '@/typings/typings';

const PageWrap = styled.div`
  padding: 2rem 0 6rem;
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 3rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0 0 3rem;
  padding: 0 0 2rem;
  border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
`;

const Chip = styled.button<{ active: boolean }>`
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  border: 0.1rem solid
    ${props =>
      props.active ? props.theme.colors.text_1000 : props.theme.colors.darkgray_300};
  background-color: ${props =>
    props.active ? props.theme.colors.text_1000 : 'transparent'};
  color: ${props =>
    props.active ? props.theme.colors.background : props.theme.colors.darkgray_800};
  transition: all 0.15s ease-in-out;
`;

interface BlogIndexProps {
  posts: Post[];
  categories: CategoryItem[];
}

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? posts.filter(p => p.frontmatter.category.includes(selected))
    : posts;

  return (
    <>
      <SEO title="Blog" description="기술 블로그 포스트 목록" />
      <PageWrap>
        <Title>Blog</Title>

        <FilterBar>
          <Chip active={selected === null} onClick={() => setSelected(null)}>
            전체 {posts.length}
          </Chip>
          {categories.map(cat => (
            <Chip
              key={cat.fieldValue}
              active={selected === cat.fieldValue}
              onClick={() => setSelected(selected === cat.fieldValue ? null : cat.fieldValue)}
            >
              {cat.fieldValue} {cat.totalCount}
            </Chip>
          ))}
        </FilterBar>

        <PostItemList posts={filtered} />
      </PageWrap>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().map(({ slug, frontmatter, readingTime }) => ({
    slug,
    frontmatter,
    readingTime,
  }));
  const categories = getAllCategories();
  return { props: { posts, categories } };
};
