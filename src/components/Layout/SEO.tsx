import useSEO from 'hooks/useSEO';
import React from 'react';
import Helmet from 'react-helmet';
import { MetaProps } from 'typings/typings';


const Head = Helmet as unknown as React.ElementType;

const SEO = ({ title, description, cover }: MetaProps) => {
  const { site, file } = useSEO();

  const SEOTitle: string = title
    ? `${title} - ${site.siteMetadata.title}`
    : site.siteMetadata.title;
  const SEODescription: string = description || site.siteMetadata.description;
  const SEOImg: string = cover || file?.publicURL || '';

  const rssHref = `${site.siteMetadata.siteUrl}/rss.xml`;

  return (
    <Head
      title={SEOTitle}
      link={[
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: '유승연 블로그 RSS',
          href: rssHref,
        },
      ]}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          httpEquiv: 'Content-Type',
          content: 'text/html; charset=UTF-8',
        },
        {
          httpEquiv: 'title',
          content: SEOTitle,
        },
        {
          name: 'description',
          content: SEODescription,
        },
        {
          name: 'keywords',
          content: 'HTML, CSS, JavaScript, TypeScript, React, FrontEnd',
        },
        {
          name: 'author',
          content: '유승연',
        },
        {
          property: 'og:title',
          content: SEOTitle,
        },
        {
          property: 'og:description',
          content: SEODescription,
        },
        {
          property: 'og:image',
          content: SEOImg,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: '유승연 블로그',
        },
        {
          name: 'twitter:title',
          content: SEOTitle,
        },
        {
          name: 'twitter:description',
          content: SEODescription,
        },
        {
          name: 'twitter:image',
          content: SEOImg,
        },
        {
          property: 'email',
          content: 'minzidev@gmail.com',
        },
        {
          httpEquiv: 'copyright',
          content: '유승연',
        },
        {
          name: 'theme-color',
          content: '#FEBE98',
        },
        {
          name: 'naver-site-verification',
          content: '2cc40621eb11418be5791db057b14a2d2cc2800c',
        },
      ]}
      htmlAttributes={{ lang: 'ko' }}
    />
  );
};

export default SEO;