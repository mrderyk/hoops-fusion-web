import { ChartData, ChartTitle } from '../../Chart';

// TODO: Lock action types with payload types
export type StatCharterActionType =
  'SET_INTERVAL' |
  'SET_CATEGORY' |
  'SET_TYPE' |
  'SET_CHART_DATA' |
  'SET_PERIOD' |
  'ADD_PLAYER' |
  'REMOVE_PLAYER';
export type StatCharterAction = {
  type: StatCharterActionType;
  payload: string | ChartData | PlayerData;
};
export type Dispatch = (action: StatCharterAction) => void;
export type StatCategory = 'per_game' | 'total'
export type StatPeriod = 'regular' | 'playoffs';
export type StatInterval = 'season' | 'age';
export type StatType = 'pts' | 'ast' | 'reb';

export interface PlayerData {
  firstName: string;
  lastName: string;
  imgUrl: string;
  key: string;
}

export interface StatCharterState {
  playersData: PlayerData[];
  interval: StatInterval;
  category: StatCategory;
  statType: StatType;
  period: StatPeriod;
  chartData: ChartData | null;
  chartTitle: ChartTitle | null;
}

export interface RawChartDatapoint {
  interval: string;
  player_key: string;
  player_name: string;
  stat: number;
}

export interface ParsedChartDataPoint {
  interval: string;
  player_name: string;
  stat: number;
}
