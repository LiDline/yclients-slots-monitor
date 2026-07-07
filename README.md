# yclients-slots-monitor

Базовый TypeScript-каркас для будущего мониторинга свободных слотов YCLIENTS с
уведомлениями в Telegram.

Текущая версия содержит только инфраструктуру проекта: конфигурацию, логирование,
слой `Driver`, структуру каталогов и команды разработки. Бизнес-логика мониторинга,
сценарии Playwright, запросы к YCLIENTS и отправка реальных уведомлений не реализованы.

## Стек

- Node.js 22+
- TypeScript, ESM
- React
- Vite
- Tailwind CSS, daisyUI
- Playwright
- Telegraf
- dotenv, Joi
- Pino, pino-pretty
- tsx
- ESLint, Prettier
- cron

## Структура

```text
apps/
  frontend/    React-интерфейс настроек мониторинга
src/
  config/      загрузка и валидация конфигурации из .env
  logger/      настройка Pino
  driver/      infrastructure-обертки над низкоуровневыми API
  browser/     будущая высокоуровневая работа с браузером
  yclients/    будущий клиент YCLIENTS поверх HttpDriver
  telegram/    будущий сервис уведомлений поверх TelegramDriver
  scheduler/   будущий запуск периодических проверок поверх CronDriver
  index.ts     точка входа
```

Фронт и бэк находятся в одном репозитории. Фронт нужен для управления
настройками мониторинга: URL записи YCLIENTS, расписанием проверки, получателем
Telegram и включением уведомлений. Playwright остается частью бэка и используется
для автоматизации YCLIENTS.

## Конфигурация

Скопируйте `.env.example` в `.env` и заполните значения перед будущим запуском
реальной бизнес-логики.

```bash
cp .env.example .env
```

`pino-pretty` используется всегда. Логи также пишутся в
`app.log` и `error.log` в корне проекта.

## Команды

```bash
npm run dev           # запуск бэка через tsx watch
npm run dev:frontend  # запуск фронта через Vite
npm run build         # сборка бэка и фронта
npm run build:backend # сборка бэка в dist
npm run build:frontend # сборка фронта

npm run start         # запуск бэка через tsx watch и фронта
```
