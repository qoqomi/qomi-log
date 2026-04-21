import React, { FunctionComponent } from 'react'

import { useCategoryList } from '@/hooks/useCategoryList'
import { Category, CategoryListWrap, CountBadge } from './CategoryList.style'


const CategoryList: FunctionComponent = function () {
  const categoryList = useCategoryList()

  return (
    <CategoryListWrap>
      {categoryList.map((category) => (
        <Category key={category.fieldValue} to={`/category?q=${category.fieldValue}`}>
          {category.fieldValue}
          <CountBadge>{category.totalCount}</CountBadge>
        </Category>
      ))}
    </CategoryListWrap>
  )
}

export default CategoryList
