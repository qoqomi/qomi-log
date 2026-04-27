import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import {
  HeaderWrap,
  LogoText,
  Nav,
  NavItem,
  NavIconLink,
  NavIconButton,
} from './Header.style';
import useScrollDirection from '@/hooks/useScrollDirection';
import { useDarkMode } from '@/contexts/DarkModeContext';

function Header() {
  const isHidden = useScrollDirection();
  const { isDark, toggle } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <HeaderWrap isHidden={isHidden}>
      <Nav>
        <LogoText href="/">My Blog</LogoText>
        <NavItem>
          <NavIconLink href="/blog">Blog</NavIconLink>
          <NavIconLink href="/archive">Archive</NavIconLink>
          <NavIconButton
            title={isDark ? '라이트모드' : '다크모드'}
            onClick={toggle}
          >
            {mounted ? (isDark ? <FiSun /> : <FiMoon />) : <FiMoon />}
          </NavIconButton>
        </NavItem>
      </Nav>
    </HeaderWrap>
  );
}

export default Header;
