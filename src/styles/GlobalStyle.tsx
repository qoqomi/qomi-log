import { Global, css, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';

import { AppTheme } from './theme';
import { customMQ } from './theme';

const GlobalStyle = function () {
  const theme = useTheme() as AppTheme;

  const style = css`
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css');

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
    #___gatsby,
    #gatsby-focus-wrapper {
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
  `;

  return <Global styles={style} />;
};

export default GlobalStyle;
