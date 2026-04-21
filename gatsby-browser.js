import 'prismjs/themes/prism-tomorrow.css';

import { DarkModeProvider } from './src/contexts/DarkModeContext';
import Layout from './src/components/Layout/Layout';

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;
