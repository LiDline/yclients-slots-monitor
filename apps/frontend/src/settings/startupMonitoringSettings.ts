export function getUniqueTelegramRecipientIds({
  telegramRecipientIds,
  telegramRecipientId,
}: {
  telegramRecipientIds: string[];
  telegramRecipientId: string;
}) {
  return Array.from(new Set([...telegramRecipientIds, telegramRecipientId.trim()].filter(Boolean)));
}

export function getServiceSelectionUrlError(serviceSelectionUrl: string) {
  const trimmedServiceSelectionUrl = serviceSelectionUrl.trim();

  if (trimmedServiceSelectionUrl === '') {
    return 'Ссылка на выбор сервиса обязательна.';
  }

  if (!isValidUrl(trimmedServiceSelectionUrl)) {
    return 'Укажите валидный URL.';
  }

  return '';
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
