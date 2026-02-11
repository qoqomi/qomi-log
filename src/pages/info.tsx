import Text from 'components/Text'
import { graphql } from 'gatsby';
import React, { FunctionComponent } from "react";

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        author: string;
        description: string;
        title: string;
      };
    };
  };
};

const InfoPage: FunctionComponent<InfoPageProps> = function({data}:InfoPageProps) {
  return <Text text={`Hello ${data.site.siteMetadata.title}`} />;
};      

export default InfoPage;


export const metaDataQuery = graphql`
query {
  site {
    siteMetadata {
      author
      description
      title
    }
  }
}
`