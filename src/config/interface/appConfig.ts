import type { LevelWithSilent } from 'pino';

import type { AppEnvironment } from './interface.js';

export interface AppConfig {
  readonly nodeEnv: AppEnvironment;
  readonly logLevel: LevelWithSilent;
  readonly telegram: {
    readonly botToken: string;
    readonly chatId: string;
  };
  readonly yclients: {
    readonly bookingUrl: string;
    readonly apiBaseUrl: string;
  };
  readonly scheduler: {
    readonly checkCronExpression: string;
  };
}
