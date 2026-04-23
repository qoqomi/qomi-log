import styled from '@emotion/styled';
import Link from 'next/link';

import { customMQ, headerMQ } from '@/styles/theme';

export const FooterWrap = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 8rem auto 0;
  background-color: ${props => props.theme.colors.lightgray_500};
`;

export const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120rem;
  padding: 3rem 0 5rem;

  ${headerMQ} {
    width: 100%;
    padding: 3rem 1.5rem 5rem;
  }

  ${customMQ} {
    width: 100%;
    padding: 3rem 1.5rem;
    flex-direction: column;
    justify-content: unset;
    align-items: unset;
  }
`;

export const LogoWrap = styled.div`
  width: 100%;

  ${customMQ} {
    margin: 0 0 4rem 0;
  }
`;

export const LogoText = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary_1000};
  text-decoration: none;
  cursor: pointer;
`;

export const Copyright = styled.div`
  margin: 1rem 0 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkgray_800};
`;

export const Menu = styled.div`
  display: flex;

  & > div:nth-of-type(2),
  & > div:nth-of-type(3) {
    margin: 0 0 0 5rem;

    ${customMQ} {
      margin: 0 0 0 3rem;
    }
  }
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;

export const NavTitle = styled.p`
  margin: 0 0 3rem 0;
  font-weight: 500;
  color: ${props => props.theme.colors.darkgray_800};
`;

export const NavLinkItem = styled(Link)`
  margin: 2.2rem 0 0;
  cursor: pointer;

  :hover {
    color: ${props => props.theme.colors.primary_1000};
  }

  :nth-of-type(1) {
    margin: 0;
  }
`;

export const NavMoreItem = styled.div`
  margin: 2.2rem 0 0;

  :hover {
    color: ${props => props.theme.colors.primary_1000};
  }

  :nth-of-type(1) {
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
  }

  svg {
    margin: 0 0 0 0.5rem;
    color: ${props => props.theme.colors.darkgray_800};
  }
`;
