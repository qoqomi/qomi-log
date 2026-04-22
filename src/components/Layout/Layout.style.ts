import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { customMQ } from 'styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(0.8rem); }
  to   { opacity: 1; transform: translateY(0); }
`;


export const LayoutWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 6rem 2rem 0;
  animation: ${fadeIn} 0.25s ease-out;

  ${customMQ} {
    padding: 6rem 1.4rem 0;
  }
`;