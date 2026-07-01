export interface TelegramSendMessageOptions {
  readonly parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  readonly disableNotification?: boolean;
}
