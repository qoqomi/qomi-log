import React from 'react';

import SEO from '@/components/Layout/SEO';
import Profile from '@/components/Profile/Profile';
import CategoryList from '@/domains/category/CategoryList';

function CategoryPage() {
  return (
    <>
      <SEO title="Category" />
      <Profile padding="6rem 0 1rem" />
      <CategoryList />
    </>
  );
}

export default CategoryPage;