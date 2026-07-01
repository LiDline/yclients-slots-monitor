import type { TelegramSendMessageOptions } from './interface.js';

export interface TelegramDriver {
  launch(): Promise<void>;
  stop(reason?: string): void;
  sendMessage(
    chatId: string | number,
    text: string,
    options?: TelegramSendMessageOptions,
  ): Promise<unknown>;
}
