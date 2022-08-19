import styled from '@emotion/styled';

export const Letter = styled.div`
  box-sizing: border-box;
  font-size: 3.5rem;
  font-weight: 300;
  padding-right: 1rem;
`

export const SearchWrapper = styled.li`
  box-sizing: border-box;
  flex: 1;
`;

export const SearchInnerWrapper = styled.div`
  position: relative;
  padding-left: 50%;

  @media (max-width: 1100px) {
    padding-left: 40%;
  }

  @media (max-width: 1100px) {
    padding-left: 25%;
  }
`