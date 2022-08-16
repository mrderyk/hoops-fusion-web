export type WidgetMakerActionType =
  'SET_WIDGET_TYPE' |
  'UPDATE_CHART_CONFIG';

export type WidgetType = 'tracker' | 'chart' | 'twitter';

export interface WidgetMakerAction {
  type: WidgetMakerActionType;
  payload: any;
};

export type WidgetConfig = ChartWidgetConfig | TwitterWidgetConfig;

export interface WidgetMakerState {
  type: WidgetType;
  configuration: WidgetConfig;
}

export interface PlayerData {
  firstName: string;
  lastName: string;
  imgUrl: string;
  key: string;
}

export interface ChartWidgetConfig {
  playersData: PlayerData[],
  category: 'per_game' | 'total';
  stat: string;
  interval: 'season' | 'age';
  period: 'regular' | 'playoffs';
}

export interface TwitterWidgetConfig {
  username: string;
}