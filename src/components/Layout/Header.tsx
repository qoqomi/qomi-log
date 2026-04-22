import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun, FiCpu, FiBookOpen } from 'react-icons/fi';

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
          <NavIconLink href="/blog" title="블로그">
            <FiBookOpen />
          </NavIconLink>
          <NavIconLink href="/archive" title="AI 보관소">
            <FiCpu />
          </NavIconLink>
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
