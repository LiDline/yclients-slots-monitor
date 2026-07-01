import 'dotenv/config';

import Joi from 'joi';

import type { AppConfig, RawEnv } from './interface/interface.js';

const envSchema = Joi.object<RawEnv>({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('info'),
  TELEGRAM_BOT_TOKEN: Joi.string().allow('').default(''),
  TELEGRAM_CHAT_ID: Joi.string().allow('').default(''),
  YCLIENTS_BOOKING_URL: Joi.string().uri().allow('').default(''),
  YCLIENTS_API_BASE_URL: Joi.string().uri().default('https://api.yclients.com'),
  CHECK_CRON_EXPRESSION: Joi.string().default('*/5 * * * *'),
}).unknown(true);

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
    nodeEnv: value.NODE_ENV,
    logLevel: value.LOG_LEVEL,
    telegram: {
      botToken: value.TELEGRAM_BOT_TOKEN,
      chatId: value.TELEGRAM_CHAT_ID,
    },
    yclients: {
      bookingUrl: value.YCLIENTS_BOOKING_URL,
      apiBaseUrl: value.YCLIENTS_API_BASE_URL,
    },
    scheduler: {
      checkCronExpression: value.CHECK_CRON_EXPRESSION,
    },
  };
}
