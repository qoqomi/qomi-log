import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { customMQ } from 'styles/theme';

export const CategoryListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 5rem 0 0;
`;

export const Category = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.6rem;
  border-radius: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  border: 0.15rem solid ${props => props.theme.colors.black_200};
  transition: all 0.2s ease-in-out;

  :hover {
    border-color: ${props => props.theme.colors.primary_1000};
    background-color: ${props => props.theme.colors.lightprimary_500};
  }

  ${customMQ} {
    font-size: 1.3rem;
    padding: 0.6rem 1.2rem;
  }
`;

export const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.4rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${props => props.theme.colors.darkgray_100};
  color: ${props => props.theme.colors.darkgray_800};
  transition: all 0.2s ease-in-out;

  ${Category}:hover & {
    background-color: ${props => props.theme.colors.primary_1000};
    color: ${props => props.theme.colors.white_1000};
  }
`;
