import { LineChart, LineChartProps } from './LineChart';
import { ChartSubtitle, ChartTitle, ChartTitleWrapper, ChartWrapper } from './styled';

export type ChartData = LineChartProps

interface ChartProps extends ChartData {
  title: ChartTitle;
}

export interface ChartTitle {
  main: string;
  subtitle?: string;
}

export const Chart: React.FC<ChartProps> = ({ title, xAxisLabels, dataset, xAxisTitle, yAxisTitle }) => {
  return (
    <ChartWrapper>
      <ChartTitleWrapper>
        <ChartTitle>{title.main.toUpperCase()}</ChartTitle>
        {
          title.subtitle && 
          <ChartSubtitle>{title.subtitle.toUpperCase()}</ChartSubtitle>
        }
      </ChartTitleWrapper>
      <LineChart
        xAxisLabels={xAxisLabels}
        dataset={dataset}
        xAxisTitle={xAxisTitle}
        yAxisTitle={yAxisTitle}
      />
    </ChartWrapper>
  );
};
