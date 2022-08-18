import styled from '@emotion/styled';
import * as colors from '../../colors';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.div<{ hasResults: boolean, fontSize?: string }>`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem 1rem 0.5rem 0;
  padding-left: ${props => props.fontSize ? parseInt(props.fontSize) + 16 + 'px' : '2.5rem'};
  border-bottom: ${props => props.hasResults ? '1px dotted rgba(0, 0, 0, 0.5)' : '1px solid rgba(0, 0, 0, 0.5)'};
  border-bottom-left-radius: ${props => props.hasResults ? 0 : '4px'};
  border-bottom-right-radius: ${props => props.hasResults ? 0 : '4px'};
`;

export const Input = styled.input<{fontSize?: string}>`
  border: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: ${props => props.fontSize ? props.fontSize : '1.5rem'};
  font-weight: 300;
  width: 100%;

  &:focus {
    outline-width: 0;
  }
`;

export const ResultsWrapper = styled.div`
  background-color: ${colors.white};
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;

  border: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;
`;

export const Results = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Result = styled.li`
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem;
  text-align: left;
  width: 100%;

  &:hover {
    background: rgb(200, 200, 200);
    cursor: pointer;
  }
`

export const ResultImage = styled.div<{src: string | undefined}>`
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: 28px auto;
  border: 1px solid rgb(120, 120, 120);
  border-radius: 2px;
  box-sizing: border-box;
  height: 36px;
  width: 30px;
`;

export const ResultLabels = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

export const ResultName = styled.div<{fontSize?: string}>`
  font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
  font-weight: 400;
  width: 100%;
`;

export const ResultPlayerTeam = styled.div`
  font-size: 0.6rem;
  font-weight: 600;
  width: 100%;
`;

export const FiltersWrapper = styled.div`
  position: absolute;
  right: 0;
  text-align: right;
  top: 100%;
  width: 100%;
`;

export const Filter = styled.span<{ selected: boolean }>`
  border-bottom: ${props => props.selected ? '2px solid blue' : 'none'};
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 600;

  &:first-of-type {
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    border-bottom: ${props => props.selected ? '2px solid blue' : '2px solid rgba(0, 0, 0, 0.5)'};
  }
`;

export const SearchInputWrapper = styled.div<{ hasResults: boolean, fontSize?: string }>`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;

  padding: 0.5rem 1rem 0.5rem 0;
  padding-left: ${props => props.fontSize ? parseInt(props.fontSize) + 16 + 'px' : '2.5rem'};
  border-bottom: ${props => props.hasResults ? '1px dotted rgba(0, 0, 0, 0.5)' : '1px solid rgba(0, 0, 0, 0.5)'};
  border-bottom-left-radius: ${props => props.hasResults ? 0 : '4px'};
  border-bottom-right-radius: ${props => props.hasResults ? 0 : '4px'};
`;


export const SearchIconWrapper = styled.div`
  box-sizing: border-box;
  left: 0;
  padding-left: 0.5rem;
  position: absolute;
`
