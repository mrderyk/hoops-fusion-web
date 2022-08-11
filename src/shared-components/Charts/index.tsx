import { ChartsWrapper, InlineChartWrapper, Wrapper } from './styled';
import { Chart, ChartData } from '../../widgets/Chart';

interface ChartsProps {
  charts: {
    [key: string]: ChartData;
  }
}

export const Charts: React.FC<ChartsProps> = ({ charts }) => {
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