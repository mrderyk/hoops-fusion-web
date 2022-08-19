import { Context, createContext, useReducer } from 'react';
import { ChartWidgetConfig, HighlightsWidgetConfig, TwitterWidgetConfig, WidgetConfig, WidgetMakerAction, WidgetMakerActionType, WidgetMakerState, WidgetType } from './types';

const initialState: WidgetMakerState = {
  type: 'chart',
  configuration: {
    playersData: [],
    category: 'per_game',
    stat: 'points',
    interval: 'season',
    period: 'regular',
  } as ChartWidgetConfig
};

const reducer = (state: WidgetMakerState, action: WidgetMakerAction): WidgetMakerState => {
  switch (action.type) {
    case 'SET_WIDGET_TYPE': 
      return {
        ...state,
        type: action.payload
      };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        configuration: action.payload
      };
    
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

export const setType = (widgetType: WidgetType): WidgetMakerAction => {
  return {
    type: 'SET_WIDGET_TYPE' as WidgetMakerActionType,
    payload: widgetType,
  };
};

export const updateConfig = (config: WidgetConfig): WidgetMakerAction => {
  return {
    type: 'UPDATE_CONFIG' as WidgetMakerActionType,
    payload: config,
  };
};

export const WidgetMakerContext: Context<any> = createContext<{state: WidgetMakerState; actions: string} | undefined>(undefined);

export const WidgetMakerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    actions: {
      setType: (widgetType: WidgetType) => dispatch(setType(widgetType)),
      updateConfig: (config: WidgetConfig) => dispatch(updateConfig(config)),
    }
  };

  return (
    <WidgetMakerContext.Provider value={value}>
      { children }
    </WidgetMakerContext.Provider>
  );
}
