import { useState } from 'react';
import { LineChart, LineChartProps } from './LineChart';
import { ChartSubtitle, ChartsWrapper, ChartTitle, ChartTitleWrapper, ChartWrapper, InlineChartWrapper, Wrapper } from './styled';

export type ChartData = LineChartProps

interface ChartsProps {
  charts: {
    [key: string]: ChartData;
  }
}

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

export const Charts: React.FC<ChartsProps> = ({ charts }) => {
  const [activeChartIndex, setActiveChartIndex] = useState<number|null>(null);

  return (
    <Wrapper>
      <ChartsWrapper>
      {
        Object.keys(charts).map((key: string, index: number) => {
          return (
            <InlineChartWrapper>
              <Chart
                key={`chart_${index}`}
                title={{
                  main: key
                }}
                xAxisLabels={charts[key].xAxisLabels}
                dataset={charts[key].dataset} 
                xAxisTitle={charts[key].xAxisTitle}
                yAxisTitle={charts[key].yAxisTitle}
              />
            </InlineChartWrapper>
          )
        })
      }
      </ChartsWrapper>
    </Wrapper>
  )
  
};