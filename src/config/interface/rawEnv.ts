import type { LevelWithSilent } from 'pino';

import type { AppEnvironment } from './interface.js';

export interface RawEnv {
  NODE_ENV: AppEnvironment;
  LOG_LEVEL: LevelWithSilent;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  YCLIENTS_BOOKING_URL: string;
  YCLIENTS_API_BASE_URL: string;
  CHECK_CRON_EXPRESSION: string;
}
