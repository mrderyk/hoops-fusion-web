import { Twitter } from 'widgets/Twitter';
import { WidgetTitle } from '../styled';
import { TwitterWidgetConfig } from '../WidgetMaker/context/types';
import { TwitterFeedWrapper, Wrapper } from './styled';

interface DashboardTwitterFeedProps {
  config: TwitterWidgetConfig
}

export const DashboardTwitterFeed: React.FC<DashboardTwitterFeedProps> = ({ config }) => {
  return (
    <Wrapper>
      <WidgetTitle>{config.title ?? 'My Custom Widget' }</WidgetTitle>
      <TwitterFeedWrapper>
        <Twitter username={config.username} />
      </TwitterFeedWrapper>
    </Wrapper>
  )
};