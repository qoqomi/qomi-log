import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type LogoProps = {
  logo: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  } | null;
};

function useLogoImage() {
  const { logo } = useStaticQuery<LogoProps>(
    graphql`
      query {
        logo: file(name: { eq: "logo" }) {
          childImageSharp {
            gatsbyImageData(width: 220)
          }
        }
      }
    `,
  );

  return logo;
}

export default useLogoImage;
