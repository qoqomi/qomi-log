import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';

import { darkTheme, theme } from 'styles/theme';

type DarkModeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggle: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') setIsDark(true);
  }, []);

  const toggle = () => {
    setIsDark(prev => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      <ThemeProvider theme={isDark ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
