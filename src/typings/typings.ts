import { IGatsbyImageData } from 'gatsby-plugin-image';

export type DescriptionProps = {
  title: string;
  date: string;
  category: string[];
  time: number;
};

export type ThumbnailProps = {
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    publicURL?: string;
  };
};

export type FrontmatterProps = {
  summary: string;
} & DescriptionProps &
  ThumbnailProps;

export type ContentProps = {
  node: {
    id: string;
    fields: {
      slug: string;
    };
    timeToRead: number;
    frontmatter: FrontmatterProps;
  };
};

export type PostItemListProps = {
  posts: ContentProps[];
};

export type PostItemProps = FrontmatterProps & { link: string; time: number };

export type IndexProps = {
  data: {
    posts: {
      edges: ContentProps[];
    };
  };
};

export type CategoryItem = {
  fieldValue: string;
  totalCount: number;
};

export type MetaProps = {
  title?: string;
  description?: string;
  cover?: string;
};

export type SEOProps = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
    };
  };
  file: {
    publicURL: string;
  };
};
