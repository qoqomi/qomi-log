import React from 'react';
import { useRouter } from 'next/router';

import GlobalStyle from 'styles/GlobalStyle';
import Footer from './Footer';
import Header from './Header';
import { LayoutWrap, Main } from './Layout.style';

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Main key={pathname}>{children}</Main>
      <Footer />
    </LayoutWrap>
  );
}

export default Layout;
