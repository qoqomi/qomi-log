import React from 'react';
import { graphql } from 'gatsby';

import { IndexProps } from '@/typings/typings';
import SEO from '@/components/Layout/SEO';
import Profile from '@/components/Profile/Profile';
import PostItemList from '@/components/PostList/PostItemList';

function IndexPage({
  data: {
    posts: { edges },
  },
}: IndexProps) {

  return (
    <>
      <SEO />
      <Profile padding="6rem 0" />
      <PostItemList posts={edges} />
    </>
  );
}

export const indexQuery = graphql`
  {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            summary
            date(formatString: "YYYY-MM-DD")
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 820)
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;