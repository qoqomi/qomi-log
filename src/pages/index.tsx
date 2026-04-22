import styled from '@emotion/styled';
import React, { useState } from 'react';
import { GetStaticProps } from 'next';

import SEO from '@/components/Layout/SEO';
import Profile from '@/components/Profile/Profile';
import PostItemList from '@/components/PostList/PostItemList';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { CategoryItem, Post } from '@/typings/typings';

const PageWrap = styled.div`
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0 0 2rem;
`;

const CategoryChip = styled.button<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: 3rem;
  font-size: 1.4rem;
  font-weight: ${props => (props.active ? 600 : 400)};
  border: 0.15rem solid
    ${props =>
      props.active
        ? props.theme.colors.primary_1000
        : props.theme.colors.black_200};
  background-color: ${props =>
    props.active ? props.theme.colors.lightprimary_500 : 'transparent'};
  color: ${props => props.theme.colors.text_1000};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors.primary_1000};
    background-color: ${props => props.theme.colors.lightprimary_500};
  }
`;

const Count = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.darkgray_800};
`;

interface IndexPageProps {
  posts: Post[];
  categories: CategoryItem[];
}

function IndexPage({ posts, categories }: IndexPageProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? posts.filter(p => p.frontmatter.category.includes(selected))
    : posts;

  return (
    <>
      <SEO />
      <PageWrap>
      <Profile padding="6rem 0 3rem" />
      <CategoryWrap>
        <CategoryChip active={selected === null} onClick={() => setSelected(null)}>
          전체
          <Count>{posts.length}</Count>
        </CategoryChip>
        {categories.map(cat => (
          <CategoryChip
            key={cat.fieldValue}
            active={selected === cat.fieldValue}
            onClick={() => setSelected(cat.fieldValue)}
          >
            {cat.fieldValue}
            <Count>{cat.totalCount}</Count>
          </CategoryChip>
        ))}
      </CategoryWrap>
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

export default IndexPage;
