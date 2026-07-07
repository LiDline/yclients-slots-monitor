export function ServiceSelectionUrlStep({
  serviceSelectionUrl,
  serviceSelectionUrlError,
  onNextStepButtonClick,
  onServiceSelectionUrlChange,
}: {
  serviceSelectionUrl: string;
  serviceSelectionUrlError: string;
  onNextStepButtonClick: () => void;
  onServiceSelectionUrlChange: (serviceSelectionUrl: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <h2 className="text-xl font-semibold text-base-content">Шаг 1. Ссылка на выбор сервиса</h2>
        <p className="mt-2 text-sm text-base-content/70">
          Укажите ссылку на страницу выбора сервиса YCLIENTS. По этой ссылке приложение будет
          открывать онлайн-запись и получать доступные услуги для мониторинга.
        </p>
      </div>

      <input
        className={`input input-bordered w-full ${serviceSelectionUrlError === '' ? '' : 'input-error'}`}
        onChange={(changeEvent) => {
          onServiceSelectionUrlChange(changeEvent.target.value);
        }}
        placeholder="https://n1416692.yclients.com/company/..."
        type="url"
        value={serviceSelectionUrl}
      />
      {serviceSelectionUrlError === '' ? null : (
        <span className="mt-2 text-sm text-error">{serviceSelectionUrlError}</span>
      )}

      <button
        className="btn btn-primary justify-self-start"
        onClick={onNextStepButtonClick}
        type="button"
      >
        Продолжить
      </button>
    </div>
  );
}
