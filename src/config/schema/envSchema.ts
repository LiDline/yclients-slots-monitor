import Joi from 'joi';

import { CLIENTS_BOOKING_URL } from '../../CONST.js';
import type { RawEnv } from '../interface/interface.js';

export const envSchema = Joi.object<RawEnv>({
  TELEGRAM_BOT_TOKEN: Joi.string().allow('').default(''),
  TELEGRAM_CHAT_ID: Joi.string().allow('').default(''),
  YCLIENTS_BOOKING_URL: Joi.string().uri().allow('').empty('').default(CLIENTS_BOOKING_URL),
  CHECK_CRON_EXPRESSION: Joi.string().default('*/5 * * * *'),
}).unknown(true);
