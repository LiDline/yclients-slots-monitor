export function TelegramRecipientsStep({
  hasTelegramRecipients,
  isNotificationEnabled,
  telegramRecipientId,
  telegramRecipientIds,
  telegramRecipientIdsError,
  onAddTelegramRecipientButtonClick,
  onNotificationEnabledChange,
  onPreviousStepButtonClick,
  onRemoveTelegramRecipientButtonClick,
  onSaveSettingsButtonClick,
  onTelegramRecipientIdChange,
}: {
  hasTelegramRecipients: boolean;
  isNotificationEnabled: boolean;
  telegramRecipientId: string;
  telegramRecipientIds: string[];
  telegramRecipientIdsError: string;
  onAddTelegramRecipientButtonClick: () => void;
  onNotificationEnabledChange: (isNotificationEnabled: boolean) => void;
  onPreviousStepButtonClick: () => void;
  onRemoveTelegramRecipientButtonClick: (telegramRecipientId: string) => void;
  onSaveSettingsButtonClick: () => void;
  onTelegramRecipientIdChange: (telegramRecipientId: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-xl font-semibold text-base-content">Шаг 2. Получатели и уведомления</h2>
        <p className="mt-2 text-sm text-base-content/70">
          Добавьте Telegram ID получателей и выберите, нужно ли отправлять уведомления.
        </p>
      </div>
      <div className="form-control">
        <span className="label">
          <span className="label-text">Telegram ID получателя</span>
        </span>
        <div className="flex gap-2">
          <input
            className={`input input-bordered min-w-0 flex-1 ${
              telegramRecipientIdsError === '' ? '' : 'input-error'
            }`}
            onChange={(changeEvent) => {
              onTelegramRecipientIdChange(changeEvent.target.value);
            }}
            placeholder="@recipient или 123456789"
            type="text"
            value={telegramRecipientId}
          />
          <button
            className="btn btn-square btn-primary"
            onClick={onAddTelegramRecipientButtonClick}
            type="button"
          >
            +
          </button>
        </div>
        {telegramRecipientIdsError === '' ? null : (
          <span className="mt-2 text-sm text-error">{telegramRecipientIdsError}</span>
        )}
      </div>
      <div className="grid gap-2">
        <h3 className="font-medium text-base-content">Добавленные получатели</h3>
        {telegramRecipientIds.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-4 text-sm text-base-content/60">
            Получатели пока не добавлены.
          </p>
        ) : (
          <ul className="grid gap-2">
            {telegramRecipientIds.map((savedTelegramRecipientId) => (
              <li
                className="flex items-center justify-between gap-3 rounded-box border border-base-300 p-3"
                key={savedTelegramRecipientId}
              >
                <span className="min-w-0 break-all">{savedTelegramRecipientId}</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    onRemoveTelegramRecipientButtonClick(savedTelegramRecipientId);
                  }}
                  type="button"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-box border border-base-300 p-4">
        <span>
          <span className="block font-medium text-base-content">Уведомления включены</span>
        </span>
        <input
          checked={isNotificationEnabled}
          className="toggle toggle-primary"
          disabled={!hasTelegramRecipients}
          onChange={(changeEvent) => {
            onNotificationEnabledChange(changeEvent.target.checked);
          }}
          type="checkbox"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-ghost" onClick={onPreviousStepButtonClick} type="button">
          Назад
        </button>
        <button className="btn btn-primary" onClick={onSaveSettingsButtonClick} type="button">
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}
