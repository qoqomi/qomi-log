import styled from '@emotion/styled';
import Link from 'next/link';

import { customMQ } from 'styles/theme';

export const PostItemWrap = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 4.5rem;
  cursor: pointer;

  :hover {
    h1 {
      color: ${props => props.theme.colors.primary_1000};
      transition: all 0.3s ease-in-out;
    }

    img {
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  }

  :nth-last-of-type(1) {
    margin: 0;
  }

  ${customMQ} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PostCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1.7rem 0 0;

  ${customMQ} {
    padding: 0;
  }
`;

export const CardTitle = styled.h1`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 2.1rem;
  font-weight: 500;
  line-height: 140%;

  ${customMQ} {
    -webkit-line-clamp: 3;
  }
`;

export const CardSummary = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: keep-all;
  font-size: 1.5rem;
  line-height: 130%;
  margin: 1.5rem 0;

  ${customMQ} {
    -webkit-line-clamp: 3;
  }
`;

export const CardDescription = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.darkgray_800};
`;
