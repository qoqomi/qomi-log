import { Global, css, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { useDarkMode } from '@/contexts/DarkModeContext';
import { AppTheme, customMQ } from './theme';

const GlobalStyle = function () {
  const theme = useTheme() as AppTheme;
  const { isDark } = useDarkMode();

  const style = css`
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css');

    @font-face {
      font-family: 'D2Coding';
      src: url('https://cdn.jsdelivr.net/gh/naver/d2codingfont@master/D2Coding/D2Coding-Ver1.3.2-20180524.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    ${emotionReset}

    *,
    *::after,
    *::before {
      box-sizing: border-box;
      margin: 0;
      border: 0;
      padding: 0;
    }

    html,
    body,
    #__next {
      width: 100%;
      height: 100%;
      color: ${theme.colors.text_1000};
      background-color: ${theme.colors.background};
      font-family: 'Pretendard Variable', Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
        'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
      font-size: 62.5%;
      font-weight: 400;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

      ${customMQ} {
        font-size: 55%;
      }
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    input,
    button {
      border: none;
      background-color: transparent;
    }

    a:focus-visible,
    button:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible,
    [tabindex]:focus-visible {
      outline: 2px solid rgb(254 190 152 / 100%);
      outline-offset: 2px;
      border-radius: 2px;
    }

    a:focus:not(:focus-visible),
    button:focus:not(:focus-visible),
    input:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible),
    select:focus:not(:focus-visible) {
      outline: none;
    }

    img {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: 10px;
      background-clip: padding-box;
      background-color: ${theme.colors.primary_1000};
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::selection {
      background-color: rgb(254 190 152 / 80%);
      color: rgb(255 255 255 / 100%);
    }

    /* highlight.js token colors */
    ${isDark ? `
      .hljs-keyword, .hljs-selector-tag, .hljs-built_in { color: #ff7b72; }
      .hljs-string, .hljs-attr { color: #a5d6ff; }
      .hljs-comment { color: #8b949e; font-style: italic; }
      .hljs-number, .hljs-literal { color: #79c0ff; }
      .hljs-title, .hljs-function { color: #d2a8ff; }
      .hljs-variable, .hljs-params { color: #ffa657; }
      .hljs-tag { color: #7ee787; }
      .hljs-attribute { color: #79c0ff; }
    ` : `
      .hljs-keyword, .hljs-selector-tag, .hljs-built_in { color: #d73a49; }
      .hljs-string, .hljs-attr { color: #032f62; }
      .hljs-comment { color: #6a737d; font-style: italic; }
      .hljs-number, .hljs-literal { color: #005cc5; }
      .hljs-title, .hljs-function { color: #6f42c1; }
      .hljs-variable, .hljs-params { color: #e36209; }
      .hljs-tag { color: #22863a; }
      .hljs-attribute { color: #005cc5; }
    `}
  `;

  return <Global styles={style} />;
};

export default GlobalStyle;
