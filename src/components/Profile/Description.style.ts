import styled from '@emotion/styled';

import { customMQ } from '@/styles/theme';

export const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${customMQ} {
    align-items: center;
  }
`;

export const Name = styled.p`
  font-size: 3rem;
  font-weight: 500;
`;

export const Introduce = styled.p`
  margin: 1.3rem 0 0.9rem;
  font-size: 1.5rem;
  line-height: 150%;

  ${customMQ} {
    margin: 1.5rem 0;
  }
`;

export const Contact = styled.div`
  display: flex;
`;

export const ContactItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 0 2rem;
  font-size: 1.3rem;

  :nth-of-type(1) {
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;

    :hover {
      color: ${props => props.theme.colors.primary_1000};
    }
  }

  svg {
    font-size: 1.8rem;
  }
`;
