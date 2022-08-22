import React, { useEffect, useRef, useState } from 'react';
import { MainTitle } from 'shared-components/MainTitle';
import Masonry from '@mui/lab/Masonry';
import {
  Page,
  Section,
} from 'shared-components/Page';
import { WidgetMaker } from 'page-components/dashboard/WidgetMaker';
import {
  ChartWidgetConfig,
  HighlightsWidgetConfig,
  SneakersWidgetConfig,
  TwitterWidgetConfig,
  WidgetConfig,
  WidgetType
} from 'page-components/dashboard/WidgetMaker/context/types';
import { DashboardChart } from 'page-components/dashboard/DashboardChart';
import { DashboardTwitterFeed } from 'page-components/dashboard/DashboardTwitterFeed';
import { DashboardHighlightsFeed } from 'page-components/dashboard/DashboardHighlightsFeed';
import { DashboardSneakersFeed } from 'page-components/dashboard/DashboardSneakersFeed';
import { initialWidgetConfigs } from '../../src/initial-widget-config';
import { SaveConfigConfirmation } from 'page-components/dashboard/SaveConfigConfirmation';

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
  const [widgetConfigs, setWidgetConfigs] = useState<DashboardWidgetConfig[]>([]);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState<boolean>(false);

  // Temporary code to set additional widgets to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let localWidgetConfigs: DashboardWidgetConfig[] = [];
    const stringifiedWidgetConfigs = localStorage.getItem('dashboardWidgets');

    if (stringifiedWidgetConfigs) {
      localWidgetConfigs = JSON.parse(stringifiedWidgetConfigs);
    }
  
    setWidgetConfigs(localWidgetConfigs.length ? localWidgetConfigs : initialWidgetConfigs);
  }, []);

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
      } else if (config.type === 'sneakers') {
        updatedWidgets.push(
          <DashboardSneakersFeed config={config.config as SneakersWidgetConfig} />
        );
      }
    });

    setWidgets(updatedWidgets);
  }, [widgetConfigs])

  const onAddWidget = (widgetType: WidgetType, config: WidgetConfig) => {
    const updatedWidgetConfigs = [
      ...widgetConfigs,
      {
        type: widgetType,
        config,
      }
    ];

    setWidgetConfigs(updatedWidgetConfigs);

    // set to local storage
    localStorage.setItem('dashboardWidgets', JSON.stringify(updatedWidgetConfigs));

    if (!localStorage.getItem('didSeeSaveConfirmation')) {
      localStorage.setItem('didSeeSaveConfirmation', 'true');
      setShowSaveConfirmation(true);
    }
  };

  return (
    <Section>
      <WidgetMaker onAddWidget={onAddWidget} />
      <Masonry columns={3} spacing={2}>
        { widgets }
      </Masonry>
      {
        showSaveConfirmation && <SaveConfigConfirmation onClose={() => setShowSaveConfirmation(false)} />
      }
    </Section>
  )
}
