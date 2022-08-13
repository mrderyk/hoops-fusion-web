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
