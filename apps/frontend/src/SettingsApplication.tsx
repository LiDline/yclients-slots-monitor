export function SettingsApplication() {
  return (
    <main className="min-h-screen bg-base-200 px-4 py-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            YCLIENTS Slots Monitor
          </p>
          <h1 className="mt-2 text-3xl font-bold text-base-content">Настройки мониторинга</h1>
          <p className="mt-3 max-w-2xl text-base text-base-content/70">
            Фронт управляет настройками, а Playwright остается на backend-стороне для работы с
            YCLIENTS.
          </p>
        </div>
        <form className="rounded-box bg-base-100 p-6 shadow-sm">
          <div className="grid gap-5">
            <label className="form-control">
              <span className="label">
                <span className="label-text">YCLIENTS booking URL</span>
              </span>
              <input
                className="input input-bordered"
                defaultValue="https://yclients.com/booking"
                placeholder="https://yclients.com/booking/..."
                type="url"
              />
            </label>
            <label className="form-control">
              <span className="label">
                <span className="label-text">Расписание проверки</span>
              </span>
              <input
                className="input input-bordered"
                defaultValue="*/15 * * * *"
                placeholder="*/15 * * * *"
                type="text"
              />
            </label>
            <label className="form-control">
              <span className="label">
                <span className="label-text">Telegram chat id или получатель</span>
              </span>
              <input
                className="input input-bordered"
                defaultValue="@recipient"
                placeholder="@recipient"
                type="text"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-box border border-base-300 p-4">
              <span>
                <span className="block font-medium text-base-content">Уведомления включены</span>
                <span className="text-sm text-base-content/70">
                  Backend будет использовать это значение при отправке сообщений.
                </span>
              </span>
              <input className="toggle toggle-primary" defaultChecked type="checkbox" />
            </label>
            <div className="alert alert-info">
              <span>
                API сохранения настроек будет подключен на backend-стороне отдельным шагом.
              </span>
            </div>
            <button className="btn btn-primary justify-self-start" type="button">
              Сохранить настройки
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
