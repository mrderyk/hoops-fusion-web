import styled from '@emotion/styled';
import * as colors from '../../colors';

export const Wrapper = styled.ul`
  align-items: center;
  background-color: ${colors.blue};
  box-sizing: border-box;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: .5rem 1rem;
  z-index: 100;
`;

export const NavLink = styled.li`
  box-sizing: border-box;
  color: ${colors.white};
  cursor: pointer;
  font-size: .8rem;
  font-weight: 600;
  padding-left: 1rem;

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    padding-left: 0;
  }
`;

export const SearchWrapper = styled.li`
  box-sizing: border-box;
  flex: 1;
  text-align: right;
  padding: 0 1rem 0 50%;
`;