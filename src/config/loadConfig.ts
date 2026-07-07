import 'dotenv/config';

import type { AppConfig } from './interface/interface.js';
import { envSchema } from './schema/envSchema.js';

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = envSchema.validate(env, {
    abortEarly: false,
    convert: true,
  });

  if (result.error) {
    throw new Error(`Invalid environment configuration: ${result.error.message}`);
  }

  const value = result.value;

  return {
    nodeEnv: 'development',
    telegram: {
      botToken: value.TELEGRAM_BOT_TOKEN,
      chatId: value.TELEGRAM_CHAT_ID,
    },
    yclients: {
      bookingUrl: value.YCLIENTS_BOOKING_URL,
    },
    scheduler: {
      checkCronExpression: value.CHECK_CRON_EXPRESSION,
    },
  };
}
