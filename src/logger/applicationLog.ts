import { APPLICATION_LOG_STREAM_BASE_PATH } from '../CONST.js';

export const APPLICATION_LOG_NAMES = ['app', 'error'] as const;
export const INFORMATION_APPLICATION_LOG_LEVEL_LABEL = 'INFO:';

export type ApplicationLogName = (typeof APPLICATION_LOG_NAMES)[number];

export type FormattedApplicationLogLine = {
  readonly applicationLogDate: string;
  readonly applicationLogLevelLabel: string;
  readonly applicationLogMessage: string;
};

type HighlightedApplicationLogNamesAfterLogChangeOptions = {
  readonly activeApplicationLogName: ApplicationLogName;
  readonly changedApplicationLogName: ApplicationLogName;
  readonly highlightedApplicationLogNames: ApplicationLogName[];
};

type HighlightedApplicationLogNamesAfterTabClickOptions = {
  readonly clickedApplicationLogName: ApplicationLogName;
  readonly highlightedApplicationLogNames: ApplicationLogName[];
};

type VisibleApplicationLogTextOptions = {
  readonly isPreviousApplicationLogTextVisible: boolean;
  readonly previousApplicationLogText: string;
  readonly receivedApplicationLogText: string;
};

type ParsedApplicationLogLine = Record<string, unknown>;

export function getApplicationLogStreamPath(applicationLogName: ApplicationLogName): string {
  return `${APPLICATION_LOG_STREAM_BASE_PATH}/${applicationLogName}`;
}

export function getFormattedApplicationLogText(applicationLogText: string): string {
  return getFormattedApplicationLogLines(applicationLogText)
    .map(
      (formattedApplicationLogLine) =>
        `${formattedApplicationLogLine.applicationLogDate} ${formattedApplicationLogLine.applicationLogLevelLabel} ${formattedApplicationLogLine.applicationLogMessage}`,
    )
    .join('\n');
}

export function getFormattedApplicationLogLines(
  applicationLogText: string,
): FormattedApplicationLogLine[] {
  return applicationLogText
    .split('\n')
    .filter((applicationLogLine) => applicationLogLine.trim() !== '')
    .map((applicationLogLine) => getFormattedApplicationLogLine(applicationLogLine));
}

export function getVisibleApplicationLogText({
  isPreviousApplicationLogTextVisible,
  previousApplicationLogText,
  receivedApplicationLogText,
}: VisibleApplicationLogTextOptions): string {
  if (isPreviousApplicationLogTextVisible) {
    return previousApplicationLogText + receivedApplicationLogText;
  }

  return receivedApplicationLogText;
}

export function getHighlightedApplicationLogNamesAfterLogChange({
  activeApplicationLogName,
  changedApplicationLogName,
  highlightedApplicationLogNames,
}: HighlightedApplicationLogNamesAfterLogChangeOptions): ApplicationLogName[] {
  if (activeApplicationLogName === changedApplicationLogName) {
    return highlightedApplicationLogNames.filter(
      (highlightedApplicationLogName) =>
        highlightedApplicationLogName !== changedApplicationLogName,
    );
  }

  if (highlightedApplicationLogNames.includes(changedApplicationLogName)) {
    return highlightedApplicationLogNames;
  }

  return [...highlightedApplicationLogNames, changedApplicationLogName];
}

export function getHighlightedApplicationLogNamesAfterTabClick({
  clickedApplicationLogName,
  highlightedApplicationLogNames,
}: HighlightedApplicationLogNamesAfterTabClickOptions): ApplicationLogName[] {
  return highlightedApplicationLogNames.filter(
    (highlightedApplicationLogName) => highlightedApplicationLogName !== clickedApplicationLogName,
  );
}

function getFormattedApplicationLogLine(applicationLogLine: string): FormattedApplicationLogLine {
  const parsedApplicationLogLine = JSON.parse(applicationLogLine) as ParsedApplicationLogLine;
  const applicationLogLineMessage = parsedApplicationLogLine['msg'];
  const applicationLogLineTime = parsedApplicationLogLine['time'];
  const applicationLogMessage =
    typeof applicationLogLineMessage === 'string' ? applicationLogLineMessage : '';
  const applicationLogDate =
    typeof applicationLogLineTime === 'number'
      ? getFormattedApplicationLogDate(new Date(applicationLogLineTime))
      : '';

  return {
    applicationLogDate,
    applicationLogLevelLabel: INFORMATION_APPLICATION_LOG_LEVEL_LABEL,
    applicationLogMessage,
  };
}

function getFormattedApplicationLogDate(applicationLogDate: Date): string {
  return `[${applicationLogDate.getFullYear()}-${
    applicationLogDate.getMonth() + 1
  }-${applicationLogDate.getDate()} ${applicationLogDate.getHours()}:${applicationLogDate.getMinutes()}]`;
}
