import { useMemo, useState } from 'react';

import { ServiceSelectionUrlStep } from '../components/ServiceSelectionUrlStep.js';
import { TelegramRecipientsStep } from '../components/TelegramRecipientsStep.js';
import type { StartupMonitoringSettings } from '../settings/interface/interface.js';
import {
  getServiceSelectionUrlError,
  getUniqueTelegramRecipientIds,
} from '../settings/startupMonitoringSettings.js';
import { saveStartupMonitoringSettings } from '../storage/startupMonitoringSettingsStorage.js';

const FIRST_SETUP_STEP_NUMBER = 1;
const SECOND_SETUP_STEP_NUMBER = 2;

export function StartupMonitoringSettingsPage({
  onSettingsSave,
}: {
  onSettingsSave: (startupMonitoringSettings: StartupMonitoringSettings) => void;
}) {
  const [setupStepNumber, setSetupStepNumber] = useState(FIRST_SETUP_STEP_NUMBER);
  const [serviceSelectionUrl, setServiceSelectionUrl] = useState(__CLIENTS_BOOKING_URL__);
  const [telegramRecipientId, setTelegramRecipientId] = useState('');
  const [telegramRecipientIds, setTelegramRecipientIds] = useState<string[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [serviceSelectionUrlError, setServiceSelectionUrlError] = useState('');
  const [telegramRecipientIdsError, setTelegramRecipientIdsError] = useState('');

  const allTelegramRecipientIds = useMemo(
    () => getUniqueTelegramRecipientIds({ telegramRecipientIds, telegramRecipientId }),
    [telegramRecipientId, telegramRecipientIds],
  );
  const hasTelegramRecipients = allTelegramRecipientIds.length > 0;
  const isNotificationSwitchChecked = hasTelegramRecipients && isNotificationEnabled;

  function goToTelegramRecipientsStep() {
    const nextServiceSelectionUrlError = getServiceSelectionUrlError(serviceSelectionUrl);

    setServiceSelectionUrlError(nextServiceSelectionUrlError);

    if (nextServiceSelectionUrlError === '') {
      setSetupStepNumber(SECOND_SETUP_STEP_NUMBER);
    }
  }

  function addTelegramRecipientId() {
    const nextTelegramRecipientId = telegramRecipientId.trim();

    if (nextTelegramRecipientId === '') {
      setTelegramRecipientIdsError('Telegram ID не должен быть пустой строкой.');
      return;
    }

    setTelegramRecipientIds(
      getUniqueTelegramRecipientIds({ telegramRecipientIds, telegramRecipientId }),
    );
    setTelegramRecipientId('');
    setTelegramRecipientIdsError('');
  }

  function removeTelegramRecipientId(removedTelegramRecipientId: string) {
    const nextTelegramRecipientIds = telegramRecipientIds.filter(
      (savedTelegramRecipientId) => savedTelegramRecipientId !== removedTelegramRecipientId,
    );

    setTelegramRecipientIds(nextTelegramRecipientIds);

    if (nextTelegramRecipientIds.length === 0 && telegramRecipientId.trim() === '') {
      setIsNotificationEnabled(false);
    }
  }

  function saveSettings() {
    const nextServiceSelectionUrlError = getServiceSelectionUrlError(serviceSelectionUrl);

    setServiceSelectionUrlError(nextServiceSelectionUrlError);
    setTelegramRecipientIdsError('');

    if (nextServiceSelectionUrlError !== '') {
      return;
    }

    const startupMonitoringSettings = {
      serviceSelectionUrl: serviceSelectionUrl.trim(),
      telegramRecipientIds: allTelegramRecipientIds,
      isNotificationEnabled: isNotificationSwitchChecked,
    };

    saveStartupMonitoringSettings(startupMonitoringSettings);
    onSettingsSave(startupMonitoringSettings);
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            YCLIENTS Slots Monitor
          </p>
          <h1 className="mt-2 text-3xl font-bold text-base-content">Стартовые настройки</h1>
          <p className="mt-3 max-w-2xl text-base text-base-content/70">
            Настройте ссылку на выбор сервиса и Telegram-получателей перед детальной настройкой
            мониторинга.
          </p>
        </div>
        <ul className="steps">
          <li
            className={`step ${setupStepNumber >= FIRST_SETUP_STEP_NUMBER ? 'step-primary' : ''}`}
          >
            Ссылка
          </li>
          <li
            className={`step ${setupStepNumber >= SECOND_SETUP_STEP_NUMBER ? 'step-primary' : ''}`}
          >
            Уведомления
          </li>
        </ul>
        <div className="rounded-box bg-base-100 p-6 shadow-sm">
          {setupStepNumber === FIRST_SETUP_STEP_NUMBER ? (
            <ServiceSelectionUrlStep
              serviceSelectionUrl={serviceSelectionUrl}
              serviceSelectionUrlError={serviceSelectionUrlError}
              onNextStepButtonClick={goToTelegramRecipientsStep}
              onServiceSelectionUrlChange={setServiceSelectionUrl}
            />
          ) : (
            <TelegramRecipientsStep
              hasTelegramRecipients={hasTelegramRecipients}
              isNotificationEnabled={isNotificationSwitchChecked}
              telegramRecipientId={telegramRecipientId}
              telegramRecipientIds={telegramRecipientIds}
              telegramRecipientIdsError={telegramRecipientIdsError}
              onAddTelegramRecipientButtonClick={addTelegramRecipientId}
              onNotificationEnabledChange={setIsNotificationEnabled}
              onPreviousStepButtonClick={() => {
                setSetupStepNumber(FIRST_SETUP_STEP_NUMBER);
              }}
              onRemoveTelegramRecipientButtonClick={removeTelegramRecipientId}
              onSaveSettingsButtonClick={saveSettings}
              onTelegramRecipientIdChange={setTelegramRecipientId}
            />
          )}
        </div>
      </section>
    </main>
  );
}
