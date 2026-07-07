import type { StartupMonitoringSettings } from '../settings/interface/interface.js';

const STARTUP_MONITORING_SETTINGS_STORAGE_KEY = 'yclientsSlotsMonitor.startupMonitoringSettings';

export function readStartupMonitoringSettings() {
  const startupMonitoringSettingsJson = localStorage.getItem(
    STARTUP_MONITORING_SETTINGS_STORAGE_KEY,
  );

  if (startupMonitoringSettingsJson === null) {
    return null;
  }

  return parseStartupMonitoringSettings(startupMonitoringSettingsJson);
}

export function saveStartupMonitoringSettings(
  startupMonitoringSettings: StartupMonitoringSettings,
) {
  localStorage.setItem(
    STARTUP_MONITORING_SETTINGS_STORAGE_KEY,
    JSON.stringify(startupMonitoringSettings),
  );
}

function parseStartupMonitoringSettings(startupMonitoringSettingsJson: string) {
  try {
    const startupMonitoringSettings = JSON.parse(startupMonitoringSettingsJson) as unknown;

    if (isStartupMonitoringSettings(startupMonitoringSettings)) {
      return startupMonitoringSettings;
    }
  } catch {
    return null;
  }

  return null;
}

function isStartupMonitoringSettings(
  startupMonitoringSettings: unknown,
): startupMonitoringSettings is StartupMonitoringSettings {
  if (typeof startupMonitoringSettings !== 'object' || startupMonitoringSettings === null) {
    return false;
  }

  if (!('serviceSelectionUrl' in startupMonitoringSettings)) {
    return false;
  }

  if (!('telegramRecipientIds' in startupMonitoringSettings)) {
    return false;
  }

  if (!('isNotificationEnabled' in startupMonitoringSettings)) {
    return false;
  }

  return (
    typeof startupMonitoringSettings.serviceSelectionUrl === 'string' &&
    Array.isArray(startupMonitoringSettings.telegramRecipientIds) &&
    startupMonitoringSettings.telegramRecipientIds.every(
      (telegramRecipientId) => typeof telegramRecipientId === 'string',
    ) &&
    typeof startupMonitoringSettings.isNotificationEnabled === 'boolean'
  );
}
