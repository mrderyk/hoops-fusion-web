import { useContext } from 'react';
import { StatCharterContext, StatCharterContextProvider } from './context';
import { PlayerData, StatCategory, StatCharterActionType, StatInterval } from './context/types';
import { Chart } from '../Charts';
import {
  AddedPlayer,
  AddedPlayerImage,
  AddedPlayerName,
  AddedPlayersEmptyState,
  AddedPlayersList,
  AddedPlayersWrapper,
  ChartEmptyState,
  ChartInnerWrapper,
  ChartWrapper,
  RemoveButton,
  ControlsContentWrapper,
  ControlsWrapper,
  FieldsWrapper,
  FieldWrapper,
  Form,
  InputWrapper,
  Label,
  Select,
  SubmitButtonWrapper,
  Wrapper
} from './styled';
import { Search, SearchResultData } from '../Search';

interface StatCharterProps {
  preselectedPlayers?: PlayerData[];
}

export const StatCharter: React.FC<StatCharterProps> = ({ preselectedPlayers }) => {
  return (
    <Wrapper>
      <StatCharterContextProvider>
        <ChartWindow />
        <ControlsWrapper>
          <Controls />
        </ControlsWrapper>
      </StatCharterContextProvider>
    </Wrapper>
  )
};

const ChartWindow: React.FC<{}> = () => {
  const { state } = useContext(StatCharterContext);
  const content = !!state.chartData ? 
    <Chart
      title={state.chartTitle}
      {...state.chartData}
    /> :
   <ChartEmptyState>
      <div>{'Configure a chart to see data here.'}</div>
    </ChartEmptyState>
  return (
    <ChartWrapper hasContent={!!state.chartData}>
      <ChartInnerWrapper>
        { content }
      </ChartInnerWrapper>
    </ChartWrapper>
  );
};

const Controls: React.FC<{}> = () => {
  const { state, actions } = useContext(StatCharterContext);

  const onUpdateStatInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actions.setStatInterval(e.target.value as StatInterval)
  };

  const onUpdateStatPeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actions.setStatPeriod(e.target.value as StatInterval)
  };

  const onUpdateStatCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actions.setStatCategory(e.target.value as StatCategory)
  };

  const onUpdateStatType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actions.setStatType(e.target.value as StatCharterActionType)
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.getChartData();
  };

  const onAddPlayer = (resultData: SearchResultData) => {
    actions.addPlayer(resultData);
  };

  return (
    <ControlsWrapper>
      <ControlsContentWrapper>
        <Form onSubmit={onSubmit}>
          <FieldsWrapper>
            <FieldWrapper>
              <Label htmlFor="category">Select Category:</Label>
              <InputWrapper>
                <Select id="category" onChange={onUpdateStatCategory}>
                  <option value="per_game">Per Game</option>
                  <option value="total">Totals</option>
                </Select>
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="stat">Select Stat:</Label>
              <InputWrapper>
                <Select id="stat" onChange={onUpdateStatType}>
                  <option value="pts">Points</option>
                  <option value="ast">Assists</option>
                  <option value="reb">Rebounds</option>
                  <option value="fga">FG Attempts</option>
                  <option value="fgm">FG Makes</option>
                  <option value="fgpct">FG %</option>
                  <option value="fg2a">FG Attempts: 2PT</option>
                  <option value="fg2m">FG Makes: 2PT</option>
                  <option value="fg2pct">FG %: 2PT</option>
                  <option value="fg3a">FG Attempts: 3PT</option>
                  <option value="fg3m">FG Makes: 3PT</option>
                  <option value="fg3pct">FG %: 3PT</option>
                  <option value="fta">FT Attempts</option>
                  <option value="ftm">FT Makes</option>
                  <option value="ftpct">FT %</option>
                  <option value="oreb">Off. Rebounds</option>
                  <option value="dreb">Def. Rebounds</option>
                  <option value="stl">Steals</option>
                  <option value="blk">Blocks</option>
                  <option value="foulp">Fouls</option>
                  <option value="mins">Minutes</option>
                  {
                    state.category === 'total' && 
                    <option value="trpdbl">Triple Doubles</option>
                  }
                </Select>
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="interval">Select Interval:</Label>
              <InputWrapper>
                <Select id="interval" onChange={onUpdateStatInterval}>
                  <option value="season">Season</option>
                  <option value="age">Age</option>
                </Select>
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="period">Select Period:</Label>
              <InputWrapper>
                <Select id="period" onChange={onUpdateStatPeriod}>
                  <option value="regular">Reg Season</option>
                  <option value="playoffs">Playoffs</option>
                </Select>
              </InputWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="period">Players:</Label>
              <Search size={'12px'} onSelect={onAddPlayer}/>
            </FieldWrapper>
            <FieldWrapper style={{ flex: 1 }}>
              <AddedPlayers />
            </FieldWrapper>
            <SubmitButtonWrapper>
              <button type="submit">{'Chart Stats'}</button>
            </SubmitButtonWrapper>
          </FieldsWrapper>
        </Form>
      </ControlsContentWrapper>
    </ControlsWrapper>
  );
};

const AddedPlayers: React.FC<{}> = () => {
  const { state: { playersData }, actions } = useContext(StatCharterContext);

  return (
    <AddedPlayersWrapper hasPlayers={playersData.length > 0}>
      {
        playersData.length === 0 ?
          <AddedPlayersEmptyState>{'Use search bar to add players'}</AddedPlayersEmptyState> :
          <AddedPlayersList>
            {
              playersData.map((playerData: PlayerData) => (
                <AddedPlayer>
                  <AddedPlayerImage src={playerData.imgUrl}>
                  </AddedPlayerImage>
                  <AddedPlayerName>
                    {`${playerData.firstName} ${playerData.lastName}`}
                  </AddedPlayerName>
                  <RemoveButton onClick={() => actions.removePlayer(playerData.key)}/>
                </AddedPlayer>
              ))
            }
          </AddedPlayersList>
      }
    </AddedPlayersWrapper>
  )
};
