import { ChartData } from "../../Charts";
import { PlayerData, StatCategory, StatCharterAction, StatCharterActionType, StatInterval, StatPeriod, StatType } from "./types";

export const setStatInterval = (interval: StatInterval): StatCharterAction => {
  return {
    type: 'SET_INTERVAL' as StatCharterActionType,
    payload: interval,
  };
};

export const setStatCategory = (category: StatCategory): StatCharterAction => {
  return {
    type: 'SET_CATEGORY' as StatCharterActionType,
    payload: category,
  };
};

export const setStatPeriod = (period: StatPeriod): StatCharterAction => {
  return {
    type: 'SET_PERIOD' as StatCharterActionType,
    payload: period,
  };
};

export const setStatType = (statType: StatType): StatCharterAction => {
  return {
    type: 'SET_TYPE' as StatCharterActionType,
    payload: statType,
  };
};

export const setChartData = (chartData: ChartData) => {
  return {
    type: 'SET_CHART_DATA' as StatCharterActionType,
    payload: chartData,
  }
};

export const addPlayer = (playerData: PlayerData) => {
  return {
    type: 'ADD_PLAYER' as StatCharterActionType,
    payload: playerData,
  }
};

export const removePlayer = (playerKey: string) => {
  return {
    type: 'REMOVE_PLAYER' as StatCharterActionType,
    payload: playerKey,
  }
}
