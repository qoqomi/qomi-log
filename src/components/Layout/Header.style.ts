import styled from '@emotion/styled';
import Link from 'next/link';

import { customMQ, minimumMQ } from '@/styles/theme';

export const HeaderWrap = styled('header', {
  shouldForwardProp: prop => prop !== 'isHidden',
})<{ isHidden: boolean }>`
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
  border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  transform: ${props => (props.isHidden ? 'translateY(-100%)' : 'translateY(0)')};
  transition: transform 0.3s ease-in-out, box-shadow 0.5s;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 0 2rem;

  ${customMQ} {
    padding: 0 1.4rem;
  }
`;

export const LogoWrap = styled(Link)`
  width: 100%;
`;

export const LogoText = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary_1000};
  text-decoration: none;
  cursor: pointer;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  ${minimumMQ} {
    display: none;
  }
`;

export const NavIconLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${props => props.theme.colors.darkgray_800};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    background-color: ${props => props.theme.colors.lightprimary_500};
    color: ${props => props.theme.colors.primary_1000};
  }
`;

export const NavIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text_1000};
  transition: all 0.2s ease-in-out;

  svg {
    font-size: 2rem;
  }

  :hover {
    background-color: ${props => props.theme.colors.lightprimary_500};
    color: ${props => props.theme.colors.primary_1000};
  }
`;
