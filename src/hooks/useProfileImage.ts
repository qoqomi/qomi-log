import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type ProfileProps = {
  profile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  } | null;
};

function useProfileImage() {
  const { profile } = useStaticQuery<ProfileProps>(
    graphql`
      query {
        profile: file(name: { eq: "profile" }) {
          childImageSharp {
            gatsbyImageData(width: 220)
          }
        }
      }
    `,
  );
  

  return profile;
}

export default useProfileImage;
