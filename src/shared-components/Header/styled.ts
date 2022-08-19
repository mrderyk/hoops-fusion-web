import styled from '@emotion/styled';
import * as colors from '../../colors';

export const Wrapper = styled.div`
  align-items: center;
  background-color: rgb(50, 50, 50);
  border-bottom: 1px solid ${colors.lightGray};

  color: white;
  display: flex;
  height: 120px;
  text-align: left;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  padding: 10px 1rem;
  position: relative;
  width: 100%;
`;

export const Title = styled.div`
  box-sizing: border-box;
  font-size: 3.5rem;
  font-weight: 600;
  padding-right: 1rem;
`

export const TopLinks= styled.ul`
  background: ${colors.white};
  box-sizing: border-box;
  color: ${colors.darkGray};
  display: flex;
  font-size: .6rem;
  font-weight: 600;
  list-style-type: none;
  margin: 0;
  padding: .4rem .4rem;
  justify-content: right;

  & > li {
    margin-left: .5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
