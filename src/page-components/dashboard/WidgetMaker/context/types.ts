export type WidgetMakerActionType =
  'SET_WIDGET_TYPE' |
  'UPDATE_CHART_CONFIG' |
  'UPDATE_TWITTER_CONFIG' |
  'UPDATE_HIGHLIGHTS_CONFIG';

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

export interface HighlightsWidgetConfig {
  playerKey: string;
}