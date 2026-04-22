import styled from '@emotion/styled';

import { customMQ } from 'styles/theme';

export const PostWrap = styled.article`
  padding: 4rem 0 8rem;
  max-width: 76.8rem;
  margin: 0 auto;
  width: 100%;
`;

export const PostHeader = styled.div`
  margin: 3rem 0 0;
`;

export const PostTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 140%;
  word-break: keep-all;

  ${customMQ} {
    font-size: 2.4rem;
  }
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0 0;
`;

export const PostDate = styled.span`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.darkgray_800};
`;

export const CategoryTag = styled.span`
  display: inline-flex;
  padding: 0.3rem 0.9rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: ${props => props.theme.colors.lightprimary_500};
`;

export const Divider = styled.hr`
  margin: 2.5rem 0;
  border: none;
  border-top: 0.1rem solid ${props => props.theme.colors.darkgray_100};
`;

export const PostContent = styled.div`
  font-size: 1.6rem;
  line-height: 180%;
  word-break: keep-all;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 5rem 0 1.2rem;
    font-weight: 600;
    line-height: 140%;
  }

  h1 {
    font-size: 2.8rem;
  }
  h2 {
    font-size: 2.4rem;
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.8rem;
  }

  p {
    margin: 0 0 2rem;
  }

  a {
    color: ${props => props.theme.colors.primary_1000};
    text-decoration: underline;
  }

  strong {
    font-weight: 600;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0 0 1.6rem 2rem;
  }

  li {
    margin: 0 0 0.6rem;
  }

  blockquote {
    margin: 2rem 0;
    padding: 1.2rem 2rem;
    border-left: 0.4rem solid ${props => props.theme.colors.primary_1000};
    background-color: ${props => props.theme.colors.lightprimary_500};
    border-radius: 0 0.8rem 0.8rem 0;
    font-style: italic;

    p {
      margin: 0;
    }
  }

  code {
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    font-size: 0.9em;
    background-color: ${props => props.theme.colors.darkgray_100};
    font-family: 'D2Coding', 'Fira Code', 'Consolas', monospace;
  }

  pre {
    margin: 0.8rem 0 1.6rem;
    padding: 1.6rem 2rem;
    border-radius: 0.4rem;
    overflow-x: auto;
    background-color: ${props => props.theme.colors.lightgray_500};
    line-height: 1.6;

    code {
      background: none;
      padding: 0;
      font-size: 1.4rem;
      font-family: 'D2Coding', 'Fira Code', 'Consolas', monospace;
    }
  }

  img {
    max-width: 100%;
    border-radius: 0.8rem;
    margin: 1.6rem 0;
  }

  hr {
    margin: 3rem 0;
    border: none;
    border-top: 0.1rem solid ${props => props.theme.colors.darkgray_100};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.8rem 0;
    font-size: 1.4rem;
  }

  th,
  td {
    padding: 0.6rem 1.2rem;
    border: 0.1rem solid ${props => props.theme.colors.darkgray_300};
    text-align: left;
  }

  th {
    background-color: ${props => props.theme.colors.lightprimary_500};
    font-weight: 600;
  }

  ${customMQ} {
    font-size: 1.5rem;
  }
`;
