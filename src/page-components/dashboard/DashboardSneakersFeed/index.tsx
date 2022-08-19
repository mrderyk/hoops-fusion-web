import { Sneakers } from 'widgets/Sneakers';
import { WidgetTitle } from '../styled';
import { SneakersWidgetConfig } from '../WidgetMaker/context/types';
import { SneakersFeedWrapper, Wrapper } from './styled';

interface DashboardSneakersFeedProps {
  config: SneakersWidgetConfig
}

export const DashboardSneakersFeed: React.FC<DashboardSneakersFeedProps> = ({ config }) => {
  return (
    <Wrapper>
      <WidgetTitle>{config.title ?? 'My Custom Widget' }</WidgetTitle>
      <SneakersFeedWrapper>
        <Sneakers sneakerTokens={config.sneakerTokens} />
      </SneakersFeedWrapper>
    </Wrapper>
  )
};