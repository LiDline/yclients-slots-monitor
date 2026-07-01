import type { TelegramSendMessageOptions } from './interface.js';

export interface FakeTelegramMessage {
  readonly chatId: string | number;
  readonly text: string;
  readonly options?: TelegramSendMessageOptions;
}
