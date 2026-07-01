import type {
  FakeTelegramMessage,
  TelegramDriver,
  TelegramSendMessageOptions,
} from './interface/interface.js';

export class FakeTelegramDriver implements TelegramDriver {
  public launched = false;
  public stoppedReason: string | undefined;
  public readonly messages: FakeTelegramMessage[] = [];

  public launch(): Promise<void> {
    this.launched = true;
    return Promise.resolve();
  }

  public stop(reason?: string): void {
    this.stoppedReason = reason;
  }

  public sendMessage(
    chatId: string | number,
    text: string,
    options?: TelegramSendMessageOptions,
  ): Promise<unknown> {
    this.messages.push(options ? { chatId, text, options } : { chatId, text });
    return Promise.resolve(undefined);
  }
}
