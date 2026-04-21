const { ThemeProvider } = require('@emotion/react');
const React = require('react');

const Layout = require('./src/components/Layout/Layout');
const { theme } = require('./src/styles/theme');

exports.wrapRootElement = ({ element }) => (
  React.createElement(ThemeProvider, { theme }, element)
);

exports.wrapPageElement = ({ element }) =>
  React.createElement(Layout.default, null, element);

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};
