import { graphql, useStaticQuery } from 'gatsby';
import { SEOProps } from 'typings/typings';


function useSEO() {
  const { site, file } = useStaticQuery<SEOProps>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        file(name: { eq: "cover" }) {
          publicURL
        }
      }
    `,
  );

  return { site, file };
}

export default useSEO;