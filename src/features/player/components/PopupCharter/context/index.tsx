/*import { useLazyQuery } from '@apollo/client';
import { data } from 'cheerio/lib/api/attributes';
import { Context, createContext, useReducer, useCallback } from 'react';
import { GET_CHART_DATA } from '../../../../../../lib/queries';
import { ChartData } from '../../../../../shared-components/Charts';
import {
  setStatCategory,
  setStatType,
  setStatInterval,
  setChartData
} from './actions';
import { Dispatch, RawChartDatapoint, StatCategory, StatCharterAction, StatCharterState, StatInterval, StatType } from './types';

const initialState: StatCharterState = {
  playerKeys: [],
  interval: 'age',
  category: 'per_game',
  statType: 'pts',
  timeframe: 'regular',
  chartData: null,
};

export const StatCharterContext: Context<any> = createContext<{state: StatCharterState; actions: string} | undefined>(undefined);

const statCharterReducer = (state: StatCharterState, action: StatCharterAction): StatCharterState => {
  switch (action.type) {
    case 'SET_INTERVAL': 
      return {
        ...state,
        interval: action.payload as StatInterval,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload as StatCategory,
      };
    case 'SET_STAT':
      return {
        ...state,
        statType: action.payload as StatType,
      };
    case 'SET_CHART_DATA':
      console.log('### SETTING: ', action.payload)
      return {
        ...state,
        chartData: action.payload as ChartData,
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};


const parseAgewiseChartData = (datapoints: RawChartDatapoint[]): ChartData => {
  const xLabels = new Set<string>();
  const dataBucketNames = new Set<string>();
  const dataset: {[key: string]: (number|null)[]} = {};

  datapoints.forEach((datapoint: RawChartDatapoint) => {
    xLabels.add(datapoint.interval);
    dataBucketNames.add(datapoint.player_name);
    dataset[datapoint.player_name] = dataset[datapoint.player_name] ?? [];
  });

  type AlignedDataPoint = {
    [key: string]: RawChartDatapoint | undefined;
  };
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
    dataset
  }
};


export const StatCharterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(statCharterReducer, initialState);
  const [ getChartData, { loading }] = useLazyQuery(GET_CHART_DATA, {
    fetchPolicy: 'network-only', 
    onCompleted: (data: any) => {
      const rawDatapoints: RawChartDatapoint[] = data.getChartData;
      if (state.interval === 'age') {
        dispatch(
          setChartData(parseAgewiseChartData(rawDatapoints))
        );
      }
    }
  });


  const memoizedGetChartData = useCallback(() => {
    getChartData({
      variables: {
        keys: ["7a428f4c-b7da-5ddd-bd1b-d9482fc3228f", "48edf6ae-d614-543a-8efb-29226093533e"], //state.playerKeys,
        timeframe: "regular",//state.timeframe,
        category: "per_game", //state.category,
        interval: "age", //state.interval,
        stat: "ptspg",//state.statType,
      }
    })

  }, [
    state.playerKeys,
    state.timeframe,
    state.category,
    state.interval,
    state.statType,
  ]);

  const value = {
    state,
    actions: {
      setStatInterval: (interval: StatInterval) => dispatch(setStatInterval(interval)),
      setStatCategory: (category: StatCategory) => dispatch(setStatCategory(category)),
      setStatType: (statType: StatType) => dispatch(setStatType(statType)),
      getChartData: memoizedGetChartData,
    }
  };

  return (
    <StatCharterContext.Provider value={value}>
      { children }
    </StatCharterContext.Provider>
  );
}
*/