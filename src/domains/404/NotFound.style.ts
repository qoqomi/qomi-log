import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const NotFoundWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8rem 0 0;
`;

export const Warning = styled.p`
  font-size: 15rem;
  font-weight: 500;
`;

export const NotFoundDescription = styled.p`
  margin: 4rem 0;
  font-size: 2.5rem;
  text-align: center;
`;

export const GoToHomeLink = styled(Link)`
  font-size: 2rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary_1000};

  &:hover {
    color: rgba(144, 144, 205, 1);
  }
`;

export const FeedbackLink = styled.a`
  width: 14rem;
  height: 5rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.white_1000};
  background-color: ${props => props.theme.colors.primary_1000};
  cursor: pointer;
  margin: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
    margin: 0 0.8rem 0 0;
  }

  &:hover {
    background-color: rgba(144, 144, 205, 1);
  }
`;
