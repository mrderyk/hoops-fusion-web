import styled from '@emotion/styled';
import * as colors from '../../../../src/colors';

export const ExpandButtonWrapper = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.midGray};
  border-radius: 4px;
  bottom: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 1rem;

  &:hover {
    background: ${colors.lightGray};
  }
`

export const ModalHeader = styled.div`
  align-items: center;
  background-color: ${colors.blue};
  box-sizing: border-box;
  color: ${colors.white};
  display: flex;
  font-size: .8rem;
  font-weight: 600;
  padding: 0.5rem;
  text-align: left;
`;

export const TitleWrapper = styled.div`
  flex: 1;
`;

export const CloseButton = styled.div`
  cursor: pointer;

  &::before {
    content: "x";
    color: ${colors.white};
  }
`

export const IconWrapper  = styled.div`
  align-items: center;
  display: flex;
  height: 100%
  justify-content: center;
  width: auto;
`;

export const HelperText = styled.div`
  box-sizing: border-box;
  font-size: .75rem;
  font-weight: bold;
  padding-right: 1rem;
`;

export const ModalInnerWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;