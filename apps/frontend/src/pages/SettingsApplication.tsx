import { useState } from 'react';

import { StartupMonitoringSettingsPage } from './StartupMonitoringSettingsPage.js';
import { YclientsDetailsSettingsPage } from './YclientsDetailsSettingsPage.js';
import { readStartupMonitoringSettings } from '../storage/startupMonitoringSettingsStorage.js';

export function SettingsApplication() {
  const [savedStartupMonitoringSettings, setSavedStartupMonitoringSettings] = useState(
    readStartupMonitoringSettings,
  );

  if (savedStartupMonitoringSettings !== null) {
    return <YclientsDetailsSettingsPage />;
  }

  return <StartupMonitoringSettingsPage onSettingsSave={setSavedStartupMonitoringSettings} />;
}
