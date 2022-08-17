import styled from '@emotion/styled';
import * as colors from 'src/colors';

export const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
`;

export const SearchWrapper = styled.div`
  font-size: .7rem;
  text-align: left;
  width: 220px;
`;

export const SearchResultWrapper = styled.div`
  align-items: end;
  display: flex;
  padding-left: 1rem;
`;

export const UserInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: .8rem;
  height: 36px;
  padding-left: .5rem;
  text-align: left;

  & div {
    width: 100%;

    &:nth-of-type(2) {
      font-weight: 400;
    }
  }
`;
