import React, { useContext, useEffect, useState } from 'react';
import { IconWrapper, HelperText, ExpandButtonWrapper, ModalWrapper, ModalHeader, ModalInnerWrapper, TitleWrapper, CloseButton, ConfiguratorWrapper, Tabs, TabPanes, ConfiguratorColumn, WidgetMakerTab, WidgetMakerTabPane } from './styled';
import { PlusIcon } from 'src/icons/PlusIcon';
import { ChartIcon } from 'src/icons/ChartIcon';
import { TwitterIcon } from 'src/icons/TwitterIcon';
import { EyeIcon } from 'src/icons/EyeIcon';
import { AddedPlayer, AddedPlayerImage, AddedPlayerName, AddedPlayersEmptyState, AddedPlayersList, AddedPlayersWrapper, ControlsContentWrapper, ControlsWrapper, FieldsWrapper, FieldWrapper, Form, InputWrapper, Label, RemoveButton, Select, SubmitButtonWrapper } from 'widgets/StatCharter/styled';
import { Search, SearchResultData } from 'widgets/Search';
import { WidgetMakerContext, WidgetMakerContextProvider } from './context';
import { WidgetConfig, WidgetType } from './context/types';

interface WidgetMakerProps {
  onAddWidget: (type: WidgetType, config: WidgetConfig) => void;
}

export const WidgetMaker: React.FC<WidgetMakerProps> = ({ onAddWidget }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const content = isOpen ?
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onAddWidget={onAddWidget} /> :
    <ExpandButton onClick={() => setIsOpen(true)} />;
  return (
    <WidgetMakerContextProvider>
      { content }
    </WidgetMakerContextProvider>
  )
};

const ExpandButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <ExpandButtonWrapper onClick={onClick}>
      <IconWrapper>
        <PlusIcon />
      </IconWrapper>
      <HelperText>{'Add a Widget'}</HelperText>
    </ExpandButtonWrapper>
    )
};

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, onAddWidget: (type: WidgetType, config: WidgetConfig) => void }> = ({ isOpen, onClose, onAddWidget }) => {
  const { state } = useContext(WidgetMakerContext);
  const onClickAddWidget = (e: any) => {
    e.preventDefault();
    onAddWidget(state.type, state.configuration);
    onClose();
  };

  return (
    <ModalWrapper>
      <ModalInnerWrapper>
        <ModalHeader>
          <TitleWrapper>
            {'Add a Widget'}
          </TitleWrapper>
          <CloseButton onClick={() => onClose()} />
        </ModalHeader>
        <Configurator />
        <button type="submit" onClick={onClickAddWidget}>{'Add Widget'}</button>
      </ModalInnerWrapper>
    </ModalWrapper>
  )
};

const Configurator = () => {
  return (
    <>
      <ConfiguratorWrapper>
        <TabsView />
      </ConfiguratorWrapper>
    </>
  )
};

const TabsView = () => {
  const { state, actions } = useContext(WidgetMakerContext);
  const onChangeTab = (widgetType: string) => actions.setType(widgetType);

  return (
    <>
      <Tabs>
        <WidgetMakerTab onClick={() => onChangeTab('tracker')} isSelected={state.type === 'tracker'}>
          <EyeIcon />
          <div>TRACKER</div>
        </WidgetMakerTab>
        <WidgetMakerTab onClick={() => onChangeTab('chart')} isSelected={state.type === 'chart'}>
          <ChartIcon />
          <div>CHART</div>
        </WidgetMakerTab>
        <WidgetMakerTab onClick={() => onChangeTab('twitter')} isSelected={state.type === 'twitter'}>
          <TwitterIcon />
          <div>TWITTER</div>
        </WidgetMakerTab>
      </Tabs>
      <TabPanes>
        <WidgetMakerTabPane isVisible={state.type === 'chart'}>
          <div>
            <ChartConfigurator />
          </div>
        </WidgetMakerTabPane >
      </TabPanes>
    </>
  )
};

// TODO: Extract the stat charter configurator and leverage it here.
const ChartConfigurator = () => {
  const { actions } = useContext(WidgetMakerContext);
  const [category, setCategory] = useState('per_game');
  const [statType, setStatType] = useState('pts');
  const [interval, setInterval] = useState('season');
  const [period, setPeriod] = useState('playoffs');
  const [playersData, setPlayersData] = useState<SearchResultData[]|[]>([]);

  useEffect(() => {
    const updated = {
      category,
      stat: statType,
      interval,
      period,
      playersData
    };
    actions.updateChartConfig(updated);
  }, [
    category,
    statType,
    interval,
    period,
    playersData
  ]);

  const onUpdateStatInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };

  const onUpdateStatPeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };

  const onUpdateStatCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const onUpdateStatType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatType(e.target.value);
  };


  const onAddPlayer = (resultData: SearchResultData) => {
    setPlayersData([
      ...playersData,
      resultData,
    ]);
  };

  const onRemovePlayer = (playerKey: string) => {
    const updatedPlayersData = playersData.filter((playersData: SearchResultData) => playersData.key !== playerKey);
    setPlayersData(updatedPlayersData);
  };

  return (
    <ControlsWrapper>
      <ControlsContentWrapper>
        <Form>
          <FieldsWrapper>
            <ConfiguratorColumn>
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
                    <option value="trpdbl">Triple Doubles</option>
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
            </ConfiguratorColumn>
            <ConfiguratorColumn>
              <FieldWrapper>
                <Label htmlFor="period">Players:</Label>
                <Search size={'12px'} onSelect={onAddPlayer} />
              </FieldWrapper>
              <FieldWrapper style={{ flex: 1 }}>
                <AddedPlayers players={playersData} onRemove={onRemovePlayer} />
              </FieldWrapper>
            </ConfiguratorColumn>
          </FieldsWrapper>
        </Form>
      </ControlsContentWrapper>
    </ControlsWrapper>
  );
};

const AddedPlayers: React.FC<{ players: SearchResultData[], onRemove: (key: string) => void }> = ({ players, onRemove }) => {
  return (
    <AddedPlayersWrapper hasPlayers={false}>
      {
        players.length === 0 ?
        <AddedPlayersEmptyState>{'Use search bar to add players'}</AddedPlayersEmptyState> :
        <AddedPlayersList>
            {
              players.map((player: SearchResultData) => (
                <AddedPlayer>
                  <AddedPlayerImage src={player.imgUrl} />
                  <AddedPlayerName>
                    {`${player.firstName} ${player.lastName}`}
                  </AddedPlayerName>
                  <RemoveButton onClick={() => onRemove(player.key)}/>
                </AddedPlayer>
              ))
            }
          </AddedPlayersList>
      }
    </AddedPlayersWrapper>
  )
};
