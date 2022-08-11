import styled from '@emotion/styled';
import * as colors from '../../colors';

export const Wrapper = styled.div`
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  height: 100%;
`;

export const ControlsWrapper = styled.div`
  box-sizing: border-box;
  border-left: 1px solid ${colors.darkGray};
  display: flex;
  height: 100%;
`;

export const ControlsContentWrapper = styled.div`
  box-sizing: border-box;
  font-size: .8rem;
  padding: 1rem;
  text-align: left;
`;

export const Label = styled.label`
  margin-right: .5rem;
`;

export const ChartWrapper = styled.div<{hasContent: boolean}>`
  align-items: center;
  background: ${props => props.hasContent ? `${colors.white}` : `${colors.lightGray}`};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  overflow: scroll;
  text-align: center;
  width: 100%;
`;

export const ChartInnerWrapper = styled.div`
  width: 100%;
`;

export const ChartEmptyState = styled.div`
  color: ${colors.darkGray};
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const Form = styled.form`
  height: 100%;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FieldWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: .25rem 0;
`;

export const SubmitButtonWrapper = styled.div`
  box-sizing: border-box;
  padding: .25rem 0;
  text-align: right;
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const Select = styled.select`
  font-family: 'Montserrat', sans-serif;
  font-size: .8rem;
  width: 100%;
`

export const AddedPlayersWrapper = styled.div<{hasPlayers: boolean}>`
  align-items: ${props => props.hasPlayers ? 'top' : 'center'};
  background: ${colors.lightGray};
  border: 1px ${props => props.hasPlayers ? 'solid' : 'dotted'} rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  display: flex;
  min-height: 2rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const AddedPlayersEmptyState = styled.div`
  color: ${colors.darkGray};
  flex: 1;
  font-size: .6rem;
  font-weight: 600;
  text-align: center;
`;

export const AddedPlayersList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const AddedPlayer = styled.li`
  align-items: center;
  background: ${colors.white};
  box-sizing: border-box;
  display: flex;
  padding: .5rem;

  border-bottom: 1px dotted ${colors.darkGray};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const RemoveButton = styled.div`
  color: ${colors.black};
  cursor: pointer;
  font-weight: 600;

  &::before {
    content: "x";
  }
`

export const AddedPlayerImage = styled.div<{src: string | undefined}>`
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

export const AddedPlayerName = styled.div`
  flex: 1;
  padding: 0 .5rem;
`;
