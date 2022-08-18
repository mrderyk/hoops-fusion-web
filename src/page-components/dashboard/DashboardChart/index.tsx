import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CHART_DATA } from 'src/shared-queries';
import { Chart, ChartData } from 'widgets/Chart';
import { compileAgewiseChartData, compileYearwiseChartData } from 'widgets/StatCharter/context/parsers';
import { WidgetTitle } from '../styled';
import { ChartWidgetConfig, PlayerData } from '../WidgetMaker/context/types';
import { Wrapper } from './styled';

interface DashboardChartProps {
  config: ChartWidgetConfig
}

export const DashboardChart: React.FC<DashboardChartProps> = ({ config }) => {
  const [chartData, setChartData] = useState<ChartData|null>(null);
  const [ getAgeWiseChartData ] = useLazyQuery(GET_CHART_DATA, {
    fetchPolicy: 'network-only', 
    onCompleted: (data: any) => {
      setChartData(compileAgewiseChartData(data.getChartData, config.stat))
    }
  });
  const [ getYearWiseChartData ] = useLazyQuery(GET_CHART_DATA, {
    fetchPolicy: 'network-only', 
    onCompleted: (data: any) => {
      setChartData(compileYearwiseChartData(data.getChartData, config.stat))
    }
  });

  const queryVars = {
    variables: {
      keys: config.playersData.map((playerData: PlayerData) => playerData.key),
      timeframe: config.period,
      category: config.category,
      interval: config.interval,
      stat: config.stat,
    }
  };

  useEffect(() => {
    if (config.interval === 'age') {
      getAgeWiseChartData(queryVars);
    } else {
      getYearWiseChartData(queryVars);
    }
  }, []);
  
  if (!chartData) return null;

  return (
    <Wrapper>
      <WidgetTitle>{config.title ?? 'My Custom Widget' }</WidgetTitle>
      <Chart
        title={{main: ''}}
        {...chartData}
      />
    </Wrapper>
  )
};