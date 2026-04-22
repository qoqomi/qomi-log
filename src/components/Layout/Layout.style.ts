import styled from '@emotion/styled';
import { customMQ } from 'styles/theme';


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

  ${customMQ} {
    padding: 6rem 1.4rem 0;
  }
`;