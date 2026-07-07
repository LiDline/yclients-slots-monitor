import type { AppEnvironment } from './interface.js';

export interface AppConfig {
  readonly nodeEnv: AppEnvironment;
  readonly telegram: {
    readonly botToken: string;
    readonly chatId: string;
  };
  readonly yclients: {
    readonly bookingUrl: string;
  };
  readonly scheduler: {
    readonly checkCronExpression: string;
  };
}
