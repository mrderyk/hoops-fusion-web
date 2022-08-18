import styled from '@emotion/styled';
import * as colors from '../../colors';

const sharedWrapperStyles = () => `
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
`;

export const TextInputWrapper = styled.div`
  ${sharedWrapperStyles()}
  padding: 0.5rem;
`;

export const Input = styled.input<{fontSize?: string}>`
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: ${props => props.fontSize ? props.fontSize : '12px'};
  font-weight: 300;
  width: 100%;

  &:focus {
    outline-width: 0;
  }
`;
