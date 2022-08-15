import { ChartData } from '../../Chart';
import { RawChartDatapoint, StatCategory, StatInterval, StatPeriod, StatType } from './types';

type AlignedDataPoint = {
  [key: string]: RawChartDatapoint | undefined;
};

export const compileAgewiseChartData = (datapoints: RawChartDatapoint[], statType: string): ChartData => {
  const xLabels = new Set<string>();
  const dataBucketNames = new Set<string>();
  const dataset: {[key: string]: (number|null)[]} = {};

  datapoints.forEach((datapoint: RawChartDatapoint) => {
    xLabels.add(datapoint.interval);
    dataBucketNames.add(datapoint.player_name);
    dataset[datapoint.player_name] = dataset[datapoint.player_name] ?? [];
  });

 
  const alignedDatapoints: AlignedDataPoint[] = [];

  xLabels.forEach((xLabel: string) => {
    const alignedDatapoint: {
      [key: string]: RawChartDatapoint | undefined;
    } = {};
    dataBucketNames.forEach((dataBucketName: string) => {
      alignedDatapoint[dataBucketName] = datapoints.find((datapoint: RawChartDatapoint) => {
        return datapoint.interval === xLabel && datapoint.player_name === dataBucketName;
      });
    });

    alignedDatapoints.push(alignedDatapoint);
  });


  alignedDatapoints.forEach((alignedDatapoint: AlignedDataPoint) => {
    Object.keys(alignedDatapoint).forEach((key: string) => {
      dataset[key].push(alignedDatapoint[key]?.stat ?? null)
    });
  })
  
  return {
    xAxisLabels: Array.from(xLabels),
    xAxisTitle: 'AGE',
    yAxisTitle: STAT_TYPE_TO_LABEL[statType].toUpperCase(),
    dataset
  };
};

export const compileYearwiseChartData = (datapoints: RawChartDatapoint[], statType: string): ChartData => {
  const dataset: {[key: string]: (number|null)[]} = {};

  datapoints.forEach((datapoint: RawChartDatapoint) => {
    dataset[datapoint.player_name] = dataset[datapoint.player_name] ?? [];
    dataset[datapoint.player_name].push(datapoint.stat);
  });
  
  // Find the the most number of seasons.
  let mostNumberOfSeasons = 0;

  Object.values(dataset).forEach((data: (number|null)[]) => {
    if (data.length > mostNumberOfSeasons) {
      mostNumberOfSeasons = data.length;
    }
  });

  const xAxisLabels = [];

  for (let i = 0; i < mostNumberOfSeasons; i++) {
    switch (i) {
      case 0:
        xAxisLabels.push('Rookie');
        break;
      case 1:
        xAxisLabels.push('Sophomore');
        break;
      default:
        xAxisLabels.push((i + 1).toString());
    }
  }
  
  return {
    xAxisLabels,
    xAxisTitle: 'YEAR',
    yAxisTitle: STAT_TYPE_TO_LABEL[statType].toUpperCase(),
    dataset
  };
};

export const getTitleFromStatType = (statType: StatType) => {
  return STAT_TYPE_TO_LABEL[statType];
};

export const getSubtitleFromChartConfig = (category: StatCategory, interval: StatInterval, period: StatPeriod) => {
  return `${STAT_PERIOD_TO_TITLE_FRAGMENT[period]} - ${STAT_CATEGORY_TO_TITLE_FRAGMENT[category]} - ${STAT_INTERVAL_TO_TITLE_FRAGMENT[interval]}`;
};

const STAT_TYPE_TO_LABEL: {[key: string]: string} = {
  'pts': 'points',
  'ast': 'assists',
  'reb': 'rebounds',
  'fga': 'fg attempts',
  'fgm': 'fg makes',
  'fgpct': 'fg percentage',
  'fg2a': 'fg attempts: 2pt',
  'fg2m': 'fg makes: 2pt',
  'fg2pct': 'fg percentage: 2pt',
  'fg3a': 'fg attempts: 3pt',
  'fg3m': 'fg makes: 3pt',
  'fg3pct': 'fg percentage: 3pt',
  'fta': 'ft attempts',
  'ftm': 'ft makes',
  'ftpct': 'ft percentage',
  'oreb': 'offensive rebounds',
  'dreb': 'defensive rebounds',
  'stl': 'steals',
  'blk': 'blocks',
  'foulp': 'fouls',
  'mins': 'minutes',
  'trpdbl': 'triple doubles',
};

const STAT_PERIOD_TO_TITLE_FRAGMENT: {[key: string]: string} = {
  regular: 'Regular Season',
  playoffs: 'Playoffs'
};

const STAT_CATEGORY_TO_TITLE_FRAGMENT: {[key: string]: string} = {
  per_game: 'Per Game',
  total: 'Total'
};

const STAT_INTERVAL_TO_TITLE_FRAGMENT: {[key: string]: string} = {
  age: 'By Age',
  season: 'By Year'
};

