import { Twitter } from 'widgets/Twitter';
import { TwitterWidgetConfig } from '../WidgetMaker/context/types';
import { Wrapper } from './styled';

interface DashboardTwitterFeedProps {
  config: TwitterWidgetConfig
}

export const DashboardTwitterFeed: React.FC<DashboardTwitterFeedProps> = ({ config }) => {

  return (
    <Wrapper>
      <Twitter username={config.username} />
    </Wrapper>
  )
};