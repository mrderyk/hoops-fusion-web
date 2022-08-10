import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { darkGray, chart as chartColors } from '../../colors';
import { ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type Dataset = {[key: string]: (number|null)[]};

export interface LineChartProps {
  xAxisLabels: string[];
  dataset: Dataset;
  xAxisTitle: string;
  yAxisTitle: string;
}

export const LineChart: React.FC<LineChartProps> = ({ xAxisLabels, dataset, xAxisTitle, yAxisTitle }) => {
  const lineColors = Object.keys(chartColors);
  const parsedDataset = Object.keys(dataset).map((key: string, index: number) => {
    const colorForLineKey = lineColors[index % lineColors.length];

    return {
      label: key,
      data: dataset[key],
      borderColor: chartColors[colorForLineKey],
      backgroundColor: chartColors[colorForLineKey]
    }
  });

  const data = {
    labels: xAxisLabels,
    datasets: parsedDataset,
  };

  const options = {
    responsive: true,

    elements: {
      line: {
        fill: false,
        borderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          color: `${darkGray}`,
          display: true,
          text: xAxisTitle,
          font: {
            weight: 600,
          }
        },
      },
      y: {
        title: {
          color: `${darkGray}`,
          display: true,
          text: yAxisTitle,
          font: {
            weight: 600,
          },
        },
        min: 0,
      },
    }
  };

  return <Line data={data} options={options as ChartOptions<any>}/>;
};
