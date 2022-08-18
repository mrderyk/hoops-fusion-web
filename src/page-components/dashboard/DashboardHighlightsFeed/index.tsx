import { Highlights } from 'widgets/Highlights';
import { HighlightsWidgetConfig } from '../WidgetMaker/context/types';
import { Wrapper } from './styled';

interface DashboardHighlightsFeedProps {
  config: HighlightsWidgetConfig
}

export const DashboardHighlightsFeed: React.FC<DashboardHighlightsFeedProps> = ({ config }) => {

  return (
    <Wrapper>
      <Highlights playerKey={config.playerKey} />
    </Wrapper>
  )
};