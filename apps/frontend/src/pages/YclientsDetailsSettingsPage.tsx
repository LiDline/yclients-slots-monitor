import { useEffect, useRef, useState } from 'react';

import {
  getFormattedApplicationLogLines,
  getApplicationLogStreamPath,
  getHighlightedApplicationLogNamesAfterLogChange,
  getHighlightedApplicationLogNamesAfterTabClick,
  getVisibleApplicationLogText,
  type ApplicationLogName,
} from '../../../../src/logger/index.js';

const YCLIENTS_SETTINGS_SECTION = 'yclientsSettings';
const TELEGRAM_SETTINGS_SECTION = 'telegramSettings';
const APP_APPLICATION_LOG_NAME = 'app';
const ERROR_APPLICATION_LOG_NAME = 'error';

type SettingsSection = typeof YCLIENTS_SETTINGS_SECTION | typeof TELEGRAM_SETTINGS_SECTION;

export function YclientsDetailsSettingsPage() {
  const [activeSettingsSection, setActiveSettingsSection] =
    useState<SettingsSection>(YCLIENTS_SETTINGS_SECTION);
  const [activeApplicationLogName, setActiveApplicationLogName] =
    useState<ApplicationLogName>(APP_APPLICATION_LOG_NAME);
  const [highlightedApplicationLogNames, setHighlightedApplicationLogNames] = useState<
    ApplicationLogName[]
  >([]);
  const [isPreviousApplicationLogTextVisible, setIsPreviousApplicationLogTextVisible] =
    useState(false);
  const [previousApplicationLogTexts, setPreviousApplicationLogTexts] = useState<
    Record<ApplicationLogName, string>
  >({
    app: '',
    error: '',
  });
  const [receivedApplicationLogTexts, setReceivedApplicationLogTexts] = useState<
    Record<ApplicationLogName, string>
  >({
    app: '',
    error: '',
  });
  const activeApplicationLogNameRef = useRef(activeApplicationLogName);
  const applicationLogContainerRef = useRef<HTMLDivElement>(null);
  const visibleApplicationLogText = getVisibleApplicationLogText({
    isPreviousApplicationLogTextVisible,
    previousApplicationLogText: previousApplicationLogTexts[activeApplicationLogName],
    receivedApplicationLogText: receivedApplicationLogTexts[activeApplicationLogName],
  });
  const formattedApplicationLogLines = getFormattedApplicationLogLines(visibleApplicationLogText);

  useEffect(() => {
    activeApplicationLogNameRef.current = activeApplicationLogName;
  }, [activeApplicationLogName]);

  useEffect(() => {
    const appApplicationLogEventSource = openApplicationLogEventSource(APP_APPLICATION_LOG_NAME);
    const errorApplicationLogEventSource = openApplicationLogEventSource(
      ERROR_APPLICATION_LOG_NAME,
    );

    return () => {
      appApplicationLogEventSource.close();
      errorApplicationLogEventSource.close();
    };
  }, []);

  useEffect(() => {
    if (applicationLogContainerRef.current !== null) {
      applicationLogContainerRef.current.scrollTop =
        applicationLogContainerRef.current.scrollHeight;
    }
  }, [activeApplicationLogName, visibleApplicationLogText]);

  function openApplicationLogEventSource(applicationLogName: ApplicationLogName): EventSource {
    const applicationLogEventSource = new EventSource(
      getApplicationLogStreamPath(applicationLogName),
    );

    applicationLogEventSource.addEventListener('application-log-initial', (applicationLogEvent) => {
      appendPreviousApplicationLogText(
        applicationLogName,
        applicationLogEvent as MessageEvent<string>,
      );
    });

    applicationLogEventSource.onmessage = (applicationLogMessageEvent) => {
      appendReceivedApplicationLogText(applicationLogName, applicationLogMessageEvent);
      setHighlightedApplicationLogNames((currentHighlightedApplicationLogNames) =>
        getHighlightedApplicationLogNamesAfterLogChange({
          activeApplicationLogName: activeApplicationLogNameRef.current,
          changedApplicationLogName: applicationLogName,
          highlightedApplicationLogNames: currentHighlightedApplicationLogNames,
        }),
      );
    };

    return applicationLogEventSource;
  }

  function appendPreviousApplicationLogText(
    applicationLogName: ApplicationLogName,
    applicationLogMessageEvent: MessageEvent<string>,
  ) {
    const applicationLogText = JSON.parse(applicationLogMessageEvent.data) as string;

    setPreviousApplicationLogTexts((currentPreviousApplicationLogTexts) => ({
      ...currentPreviousApplicationLogTexts,
      [applicationLogName]:
        currentPreviousApplicationLogTexts[applicationLogName] + applicationLogText,
    }));
  }

  function appendReceivedApplicationLogText(
    applicationLogName: ApplicationLogName,
    applicationLogMessageEvent: MessageEvent<string>,
  ) {
    const applicationLogText = JSON.parse(applicationLogMessageEvent.data) as string;

    setReceivedApplicationLogTexts((currentReceivedApplicationLogTexts) => ({
      ...currentReceivedApplicationLogTexts,
      [applicationLogName]:
        currentReceivedApplicationLogTexts[applicationLogName] + applicationLogText,
    }));
  }

  function selectApplicationLogName(nextApplicationLogName: ApplicationLogName) {
    activeApplicationLogNameRef.current = nextApplicationLogName;
    setActiveApplicationLogName(nextApplicationLogName);
    setHighlightedApplicationLogNames((currentHighlightedApplicationLogNames) =>
      getHighlightedApplicationLogNamesAfterTabClick({
        clickedApplicationLogName: nextApplicationLogName,
        highlightedApplicationLogNames: currentHighlightedApplicationLogNames,
      }),
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8">
      <section className="mx-auto flex h-[90vh] w-[90vw] max-w-none flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            YCLIENTS Slots Monitor
          </p>
          <h1 className="mt-2 text-3xl font-bold text-base-content">Детальные настройки</h1>
        </div>
        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.8fr)]">
          <div className="rounded-box bg-base-100 p-6 shadow-sm">
            <div className="tabs tabs-box">
              <button
                className={`tab ${activeSettingsSection === YCLIENTS_SETTINGS_SECTION ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveSettingsSection(YCLIENTS_SETTINGS_SECTION);
                }}
                type="button"
              >
                Настройки YCLIENTS
              </button>
              <button
                className={`tab ${activeSettingsSection === TELEGRAM_SETTINGS_SECTION ? 'tab-active' : ''}`}
                onClick={() => {
                  setActiveSettingsSection(TELEGRAM_SETTINGS_SECTION);
                }}
                type="button"
              >
                Настройки Telegram
              </button>
            </div>
            <div className="pt-6">
              <h2 className="text-xl font-semibold text-base-content">
                Раздел находится в разработке
              </h2>
            </div>
          </div>
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-box bg-base-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content">Логи</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-base-content/80">
              <input
                checked={isPreviousApplicationLogTextVisible}
                className="checkbox checkbox-sm"
                onChange={(changeEvent) => {
                  setIsPreviousApplicationLogTextVisible(changeEvent.target.checked);
                }}
                type="checkbox"
              />
              Показывать предыдущие логи
            </label>
            <div className="tabs tabs-box mt-4">
              <button
                className={`tab ${activeApplicationLogName === APP_APPLICATION_LOG_NAME ? 'tab-active' : ''} ${highlightedApplicationLogNames.includes(APP_APPLICATION_LOG_NAME) ? 'text-error' : ''}`}
                onClick={() => {
                  selectApplicationLogName(APP_APPLICATION_LOG_NAME);
                }}
                type="button"
              >
                app
              </button>
              <button
                className={`tab ${activeApplicationLogName === ERROR_APPLICATION_LOG_NAME ? 'tab-active' : ''} ${highlightedApplicationLogNames.includes(ERROR_APPLICATION_LOG_NAME) ? 'text-error' : ''}`}
                onClick={() => {
                  selectApplicationLogName(ERROR_APPLICATION_LOG_NAME);
                }}
                type="button"
              >
                error
              </button>
            </div>
            <div
              className="mt-4 h-0 min-h-80 flex-1 overflow-y-auto rounded-box bg-base-300 p-4 font-mono text-sm leading-relaxed text-base-content/80"
              ref={applicationLogContainerRef}
            >
              <div className="grid min-h-full content-start gap-1 whitespace-pre-wrap break-words">
                {formattedApplicationLogLines.map(
                  (formattedApplicationLogLine, formattedApplicationLogLineIndex) => (
                    <div
                      key={`${formattedApplicationLogLine.applicationLogDate}-${formattedApplicationLogLineIndex}`}
                    >
                      <span>{formattedApplicationLogLine.applicationLogDate} </span>
                      <span className="text-success">
                        {formattedApplicationLogLine.applicationLogLevelLabel}{' '}
                      </span>
                      <span className="text-info">
                        {formattedApplicationLogLine.applicationLogMessage}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
