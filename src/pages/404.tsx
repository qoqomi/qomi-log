import React from 'react';

import SEO from '@/components/Layout/SEO';
import NotFound from '@/domains/404/NotFound';

function NotFoundPage() {
  return (
    <>
      <SEO title="404" />
      <NotFound />
    </>
  );
}

export default NotFoundPage;