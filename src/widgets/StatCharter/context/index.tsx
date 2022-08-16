import { gql, useLazyQuery } from '@apollo/client';
import { Context, createContext, useReducer, useCallback } from 'react';
import { ChartData } from '../../Chart';
import {
  setStatCategory,
  setStatType,
  setStatInterval,
  setChartData,
  addPlayer,
  setStatPeriod,
  removePlayer
} from './actions';
import { compileAgewiseChartData, compileYearwiseChartData, getSubtitleFromChartConfig, getTitleFromStatType } from './parsers';
import { PlayerData, RawChartDatapoint, StatCategory, StatCharterAction, StatCharterState, StatInterval, StatPeriod, StatType } from './types';
import { GET_CHART_DATA } from 'src/shared-queries';

const initialState: StatCharterState = {
  playersData: [],
  interval: 'season',
  category: 'per_game',
  statType: 'pts',
  period: 'regular',
  chartData: null,
  chartTitle: null,
};

export const StatCharterContext: Context<any> = createContext<{state: StatCharterState; actions: string} | undefined>(undefined);

const statCharterReducer = (state: StatCharterState, action: StatCharterAction): StatCharterState => {
  switch (action.type) {
    case 'SET_INTERVAL': 
      return {
        ...state,
        interval: action.payload as StatInterval,
      };
    case 'SET_PERIOD':
      return {
        ...state,
        period: action.payload as StatPeriod,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload as StatCategory,
      };
    case 'SET_TYPE':
      return {
        ...state,
        statType: action.payload as StatType,
      };
    case 'SET_CHART_DATA':
      return {
        ...state,
        chartData: action.payload as ChartData,
        chartTitle: {
          main: getTitleFromStatType(state.statType),
          subtitle: getSubtitleFromChartConfig(state.category, state.interval, state.period)
        },
      }
    case 'ADD_PLAYER':
      if (state.playersData.find((playerData: PlayerData) => playerData.key === (action.payload as PlayerData).key)) {
        return { ...state };
      }
      return {
        ...state,
        playersData: [
          ...state.playersData,
          action.payload as PlayerData
        ],
      };
    case 'REMOVE_PLAYER':
      return {
        ...state,
        playersData: state.playersData.filter((playerData: PlayerData) => playerData.key !== action.payload),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
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
          setChartData(compileAgewiseChartData(rawDatapoints, state.statType))
        );
      } else if (state.interval === 'season') {
        dispatch(
          setChartData(compileYearwiseChartData(rawDatapoints, state.statType))
        );
      }
    }
  });

  const memoizedGetChartData = useCallback(() => {
    getChartData({
      variables: {
        keys: state.playersData.map((playerData: PlayerData) => playerData.key),
        timeframe: state.period,
        category: state.category,
        interval: state.interval,
        stat: state.statType,
      }
    })

  }, [
    state.playersData,
    state.period,
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
      setStatPeriod: (period: StatPeriod) => dispatch(setStatPeriod(period)),
      addPlayer: (playerData: PlayerData) => dispatch(addPlayer(playerData)),
      removePlayer: (playerKey: string) => dispatch(removePlayer(playerKey)),
      getChartData: memoizedGetChartData,
    }
  };

  return (
    <StatCharterContext.Provider value={value}>
      { children }
    </StatCharterContext.Provider>
  );
}
