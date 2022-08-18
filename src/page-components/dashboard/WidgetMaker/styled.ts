import styled from '@emotion/styled';
import * as colors from '../../../../src/colors';

export const sharedWrapperStyles = () => `
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.midGray};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  
  position: absolute;
  top: .5rem;
  right: .5rem;
`;

export const ExpandButtonWrapper = styled.div`
  ${sharedWrapperStyles()}
  padding: 0.5rem 1rem;

  &:hover {
    background: ${colors.lightGray};
  }
`;

export const ModalWrapper = styled.div`
  ${sharedWrapperStyles()}
  width: 520px;
`;

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
`;

export const ModalInnerWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 5rem;
  width: 100%;
`;

export const ConfiguratorWrapper = styled.div`
  padding: 0.5rem;
  text-align: center;
`;

export const Tabs = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  top: 1px;
  width: 100%;
`;

export const WidgetMakerTab = styled.li<{isSelected: boolean}>`
  align-items: center;
  background: ${props => props.isSelected ? colors.white : colors.midGray};
  border: 1px solid ${colors.darkGray};
  border-bottom: 1px solid ${props => props.isSelected ? colors.white : colors.darkGray };
  border-left: none;
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
  font-weight: 400;
  height: 50px;
  justify-content: center;
  width: 80px;

  &:hover {
    background: ${colors.white};
  }
  
  &:first-of-type {
    border-left: 1px solid ${colors.darkGray};
  }

  & > div {
    padding-top: .2rem;
  }
`

export const WidgetMakerTabPane = styled.li<{isVisible: boolean}>`
  display: ${props => props.isVisible ? 'block' : 'none'} !important;
`;

export const TabPanes = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;

  & > li {
    background: ${colors.white};
    border: 1px solid ${colors.darkGray};
    display: flex;
    flex-direction: column;
    font-size: 0.5rem;
    font-weight: 600;
    width: 100%;
  }
`;

export const ConfiguratorColumn = styled.div`
  padding-right: 1rem;

  &:last-of-type {
    padding-right: 0;
  }
`;

export const AddWidgetWrapper = styled.div`
  text-align: right;

  & > button {
    background-color: ${colors.white};
    border: 1px solid ${colors.darkGray};
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: .6rem;
    font-weight: 600;
    margin: 0.5rem;
    padding: 0.5rem;
    width: 100px;

    &:hover {
      background-color: ${colors.lightGray};
    }
  }
`;

export const ConfiguratorFieldsWrapper = styled.div`
  display: flex;
  height: 100%;
`
