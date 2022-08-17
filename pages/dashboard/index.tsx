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
  WidgetConfig,
  WidgetType
} from 'page-components/dashboard/WidgetMaker/context/types';
import { DashboardChart } from 'page-components/dashboard/DashboardChart';

interface DashboardWidgetConfig {
  type: WidgetType;
  config: WidgetConfig;
}

export default function Dashboard() {
  const [widgets, setWidgets] = useState<React.ReactNode[]>([]);
  const [widgetConfigs, setWidgetConfigs] = useState<DashboardWidgetConfig[]>([]);

  useEffect(() => {
    const updatedWidgets: React.ReactNode[] = [];
    widgetConfigs.forEach((config: DashboardWidgetConfig) => {
      if (config.type === 'chart') {
        updatedWidgets.push(
          <DashboardChart config={config.config as ChartWidgetConfig} />
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
    <Page 
      headerContent={<MainTitle>My Dashboard</MainTitle>}
      navConfig={{
        links: [{
          text: 'PLAYER DIRECTORY',
          href: '/players/a'
        }]
      }}
    >
      <Section>
        <WidgetMaker onAddWidget={onAddWidget} />
        <Plock>
          { widgets }
        </Plock>
      </Section>
    </Page>
  );
}
