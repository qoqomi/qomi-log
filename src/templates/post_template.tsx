import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import SEO from '@/components/Layout/SEO';
import {
  CategoryTag,
  Divider,
  PostContent,
  PostDate,
  PostHeader,
  PostMeta,
  PostTitle,
  PostWrap,
  Thumbnail,
} from './post_template.style';

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          html: string;
          frontmatter: {
            title: string;
            summary: string;
            date: string;
            category: string[];
            thumbnail: {
              childImageSharp: {
                gatsbyImageData: IGatsbyImageData;
              };
            };
          };
        };
      }>;
    };
  };
};

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, category, thumbnail },
    },
  } = edges[0];

  return (
    <>
      <SEO title={title} description={summary} />
      <PostWrap>
        <Thumbnail image={thumbnail.childImageSharp.gatsbyImageData} alt={title} />
        <PostHeader>
          <PostTitle>{title}</PostTitle>
          <PostMeta>
            <PostDate>{date}</PostDate>
              <CategoryTag>{category}</CategoryTag>
          </PostMeta>
        </PostHeader>
        <Divider />
        <PostContent dangerouslySetInnerHTML={{ __html: html }} />
      </PostWrap>
    </>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            category
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
