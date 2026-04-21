import styled from '@emotion/styled';
import { GatsbyImage } from 'gatsby-plugin-image';

import { customMQ } from '@/styles/theme';

export const ImgWrap = styled.div`
  width: 22rem;
  height: 14rem;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 0;
  margin: 0 3rem 0 0;

  ${customMQ} {
    width: 100%;
    height: auto;
    margin: 0 0 1.7rem;
  }
`;

export const Img = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  isolation: isolate;
`;