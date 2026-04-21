import React from 'react';
import { FiMoon, FiSun, FiTag, FiCpu } from 'react-icons/fi';

import { HeaderWrap, Logo, LogoText, LogoWrap, Nav, NavItem, NavIconLink, NavIconButton } from './Header.style';
import useLogoImage from '@/hooks/useLogoImage';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useDarkMode } from '@/contexts/DarkModeContext';

function Header() {
  const logo = useLogoImage();
  const isHidden = useScrollDirection();
  const { isDark, toggle } = useDarkMode();

  return (
    <HeaderWrap isHidden={isHidden}>
      <Nav>
        {logo ? (
          <LogoWrap to="/">
            <Logo image={logo.childImageSharp.gatsbyImageData} alt="홈으로 이동" />
          </LogoWrap>
        ) : (
          <LogoText to="/">My Blog</LogoText>
        )}
        <NavItem>
          <NavIconLink to="/category" title="태그">
            <FiTag />
          </NavIconLink>
          <NavIconLink to="/archive" title="AI 보관소">
            <FiCpu />
          </NavIconLink>
          <NavIconButton title={isDark ? '라이트모드' : '다크모드'} onClick={toggle}>
            {isDark ? <FiSun /> : <FiMoon />}
          </NavIconButton>
        </NavItem>
      </Nav>
    </HeaderWrap>
  );
}

export default Header;
