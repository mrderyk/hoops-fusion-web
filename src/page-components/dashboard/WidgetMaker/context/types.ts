export type WidgetMakerActionType =
  'SET_WIDGET_TYPE' |
  'UPDATE_CONFIG';

export type WidgetType = 'tracker' | 'chart' | 'twitter' | 'highlights';

export interface WidgetMakerAction {
  type: WidgetMakerActionType;
  payload: any;
};

export type WidgetConfig = ChartWidgetConfig | TwitterWidgetConfig | HighlightsWidgetConfig;

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

export interface SharedWidgetConfig {
  title?: string;
}

export interface ChartWidgetConfig extends SharedWidgetConfig {
  playersData: PlayerData[],
  category: 'per_game' | 'total';
  stat: string;
  interval: 'season' | 'age';
  period: 'regular' | 'playoffs';
}

export interface TwitterWidgetConfig extends SharedWidgetConfig {
  username: string;
}

export interface HighlightsWidgetConfig extends SharedWidgetConfig {
  playerKey: string;
}