import styled from '@emotion/styled';
import { customMQ } from 'styles/theme';


export const LayoutWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 76.8rem;
  margin: 0 auto;
  padding: 6rem 0 0;

  ${customMQ} {
    width: 100%;
    padding: 6rem 1.4rem 0;
  }
`;