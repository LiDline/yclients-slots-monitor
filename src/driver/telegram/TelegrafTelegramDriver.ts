import { Telegraf, type Types } from 'telegraf';

import type {
  TelegrafTelegramDriverConfig,
  TelegramDriver,
  TelegramSendMessageOptions,
} from './interface/interface.js';

export class TelegrafTelegramDriver implements TelegramDriver {
  private readonly bot: Telegraf;

  public constructor(private readonly config: TelegrafTelegramDriverConfig) {
    this.bot = new Telegraf(config.botToken);
  }

  public launch(): Promise<void> {
    return this.bot.launch();
  }

  public stop(reason?: string): void {
    this.bot.stop(reason);
  }

  public sendMessage(
    chatId: string | number,
    text: string,
    options?: TelegramSendMessageOptions,
  ): Promise<unknown> {
    const extra: Types.ExtraReplyMessage = {};

    if (options?.parseMode) {
      extra.parse_mode = options.parseMode;
    }

    if (options?.disableNotification !== undefined) {
      extra.disable_notification = options.disableNotification;
    }

    return this.bot.telegram.sendMessage(chatId, text, extra);
  }
}
