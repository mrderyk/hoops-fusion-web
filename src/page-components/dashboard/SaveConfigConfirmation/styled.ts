import styled from '@emotion/styled';
import * as colors from 'src/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute; 
  top: 2rem;
  width: 100%;
`;

export const PopupWrapper = styled.div`
  background-color: rgba(10, 97, 17, 0.95);
  border: 1px solid ${colors.white};
  border-radius: 4px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  margin: 0 auto;
  padding: .5rem;
  position: relative;
  width: 480px;

  & div {
    color: ${colors.white};
    font-size: .8rem;
    text-align: center;

    &:last-of-type {
      font-weight: 600;
      margin-top: .5rem;
    }
  }
`;

export const CloseButton = styled.div`
  align-items: center;
  background-color: rgba(10, 97, 17, 0.95);
  border: 1px solid ${colors.white};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 1rem;
  justify-content: center;
  position: absolute; 
  right: -0.5rem;
  top: -1rem;
  transform: rotate(45deg);
  width: 1rem;

  &:hover {
    background-color: rgba(23, 191, 68, 0.95);
  }
`;