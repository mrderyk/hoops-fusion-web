import styled from '@emotion/styled';
import * as colors from '../../colors';

const sharedWrapperStyles = () => `
  align-items: center;
  background-color: ${colors.blue};
  box-sizing: border-box;
  display: flex;
  list-style-type: none;
  margin: 0;
`;

const sharedLinkStyles = () => `
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  padding-left: 1rem;

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    padding-left: 0;
  }
`;

export const Wrapper = styled.ul`
  ${sharedWrapperStyles()}
  background-color: ${colors.blue};
  padding: .5rem 1rem;
  z-index: 100;
`;

export const SubNavWrapper = styled.ul`
  ${sharedWrapperStyles()}
  font-weight: 400;
  background-color: ${colors.white};
  padding: 1rem;
  padding-bottom: .5rem;
`;

export const NavLink = styled.li`
  ${sharedLinkStyles()}
  color: ${colors.white};
  font-size: .9rem;
`;

export const SubNavLink = styled.li`
  ${sharedLinkStyles()}
  color: ${colors.blue};
  font-size: .8rem;
`;

export const SearchWrapper = styled.li`
  box-sizing: border-box;
  flex: 1;
  text-align: right;
  padding: 0 1rem 0 50%;
`;