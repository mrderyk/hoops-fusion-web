import React, { useEffect, useState } from 'react';
import { MainTitle } from 'shared-components/MainTitle';
import { Plock } from 'react-plock';
import {
  Page,
  Section,
} from 'shared-components/Page';
import { WidgetMaker } from 'page-components/dashboard/WidgetMaker';
import {
  ChartWidgetConfig,
  HighlightsWidgetConfig,
  TwitterWidgetConfig,
  WidgetConfig,
  WidgetType
} from 'page-components/dashboard/WidgetMaker/context/types';
import { DashboardChart } from 'page-components/dashboard/DashboardChart';
import { DashboardTwitterFeed } from 'page-components/dashboard/DashboardTwitterFeed';
import { DashboardHighlightsFeed } from 'page-components/dashboard/DashboardHighlightsFeed';
import { initialWidgetConfigs } from './initial-widget-config';

interface DashboardWidgetConfig {
  type: WidgetType;
  config: WidgetConfig;
}


export default function Dashboard() {
  return (
    <Page headerContent={<MainTitle>My Dashboard</MainTitle>}>
      <DashboardContent />
    </Page>
  );
};

export const DashboardContent = () => {
  const [widgets, setWidgets] = useState<React.ReactNode[]>([]);
  const [widgetConfigs, setWidgetConfigs] = useState<DashboardWidgetConfig[]>(initialWidgetConfigs);

  useEffect(() => {
    const updatedWidgets: React.ReactNode[] = [];
    widgetConfigs.forEach((config: DashboardWidgetConfig) => {
      if (config.type === 'chart') {
        updatedWidgets.push(
          <DashboardChart config={config.config as ChartWidgetConfig} />
        );
      } else if (config.type === 'twitter') {
        updatedWidgets.push(
          <DashboardTwitterFeed config={config.config as TwitterWidgetConfig} />
        );
      } else if (config.type === 'highlights') {
        updatedWidgets.push(
          <DashboardHighlightsFeed config={config.config as HighlightsWidgetConfig} />
        );
      }
    });

    setWidgets(updatedWidgets);
  }, [widgetConfigs])

  const onAddWidget = (widgetType: WidgetType, config: WidgetConfig) => {
    setWidgetConfigs([
      ...widgetConfigs,
      {
        type: widgetType,
        config,
      }
    ])
  };

  return (
    <Section>
        <WidgetMaker onAddWidget={onAddWidget} />
        <Plock>
          { widgets }
        </Plock>
      </Section>
  )
}
