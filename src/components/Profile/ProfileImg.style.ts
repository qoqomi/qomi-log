import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

export const ImgWrap = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 6.5rem;
  overflow: hidden;
  text-align: center;
  z-index: 0;
  flex-shrink: 0;
`;

export const Img = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  isolation: isolate;
`;

export const PlaceholderWrap = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 6.5rem;
  background-color: ${props => props.theme.colors.lightprimary_500};
  flex-shrink: 0;
`;
