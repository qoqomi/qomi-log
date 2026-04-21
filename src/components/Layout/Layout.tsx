import React from 'react';

import GlobalStyle from 'styles/GlobalStyle';
import Footer from './Footer';
import Header from './Header';
import { LayoutWrap, Main } from './Layout.style';

function Layout({ children }: { children: React.ReactNode }) {
  return (
      <LayoutWrap>
        <GlobalStyle />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </LayoutWrap>
  );
}

export default Layout;
