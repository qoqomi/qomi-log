import styled from '@emotion/styled';

import { customMQ } from '@/styles/theme';

export const ImgWrap = styled.div`
  position: relative;
  width: 22rem;
  aspect-ratio: 16 / 10;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 0;
  margin: 0 3rem 0 0;
  flex-shrink: 0;

  ${customMQ} {
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 0 0 1.7rem;
  }
`;
