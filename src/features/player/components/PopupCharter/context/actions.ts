/** 
import { ChartData } from "../../../../../shared-components/Charts";
import { StatCategory, StatCharterAction, StatCharterActionType, StatInterval, StatType } from "./types";

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
}*/