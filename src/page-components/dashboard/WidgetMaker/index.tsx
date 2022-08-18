import React, { useContext, useState } from 'react';
import { IconWrapper, HelperText, ExpandButtonWrapper, ModalWrapper, ModalHeader, ModalInnerWrapper, TitleWrapper, CloseButton, ConfiguratorWrapper, Tabs, TabPanes, ConfiguratorColumn, WidgetMakerTab, WidgetMakerTabPane, AddWidgetWrapper } from './styled';
import { PlusIcon } from 'src/icons/PlusIcon';
import { ChartIcon } from 'src/icons/ChartIcon';
import { TwitterIcon } from 'src/icons/TwitterIcon';
import { EyeIcon } from 'src/icons/EyeIcon';
import { WidgetMakerContext, WidgetMakerContextProvider } from './context';
import { WidgetConfig, WidgetType } from './context/types';
import { ChartConfigurator } from './ChartConfigurator';
import { TwitterConfigurator } from './TwitterConfigurator';
import { VideoIcon } from 'src/icons/VideoIcon';
import { HighlightsConfigurator } from './HighlightsConfigurator';

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
        <AddWidgetWrapper>
          <button onClick={onClickAddWidget}>{'ADD WIDGET'}</button>
        </AddWidgetWrapper>
        
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
        <WidgetMakerTab onClick={() => onChangeTab('highlights')} isSelected={state.type === 'highlights'}>
          <VideoIcon />
          <div>HIGHLIGHTS</div>
        </WidgetMakerTab>
      </Tabs>
      <TabPanes>
        <WidgetMakerTabPane isVisible={state.type === 'chart'}>
          <div>
            <ChartConfigurator />
          </div>
        </WidgetMakerTabPane>
        <WidgetMakerTabPane isVisible={state.type === 'twitter'}>
          <div>
            <TwitterConfigurator />
          </div>
        </WidgetMakerTabPane>
        <WidgetMakerTabPane isVisible={state.type === 'highlights'}>
          <div>
            <HighlightsConfigurator />
          </div>
        </WidgetMakerTabPane>
      </TabPanes>
    </>
  )
};
