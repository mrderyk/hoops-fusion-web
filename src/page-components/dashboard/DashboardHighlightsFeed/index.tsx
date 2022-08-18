import { Highlights } from 'widgets/Highlights';
import { WidgetTitle } from '../styled';
import { HighlightsWidgetConfig } from '../WidgetMaker/context/types';
import { Wrapper } from './styled';

interface DashboardHighlightsFeedProps {
  config: HighlightsWidgetConfig
}

export const DashboardHighlightsFeed: React.FC<DashboardHighlightsFeedProps> = ({ config }) => {

  return (
    <Wrapper>
      <WidgetTitle>{config.title ?? 'My Custom Widget' }</WidgetTitle>
      <Highlights playerKey={config.playerKey} />
    </Wrapper>
  )
};