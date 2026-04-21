import { graphql, useStaticQuery } from "gatsby"
import { CategoryItem } from '@/typings/typings'

export const useCategoryList = (): CategoryItem[] => {
    const { categoryList } = useStaticQuery(graphql`
        query {
            categoryList: allMarkdownRemark {
                group(field: {frontmatter: {category: SELECT}}) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)
    return categoryList.group
}