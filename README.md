# yclients-slots-monitor

Базовый TypeScript-каркас для будущего мониторинга свободных слотов YCLIENTS с
уведомлениями в Telegram.

Текущая версия содержит только инфраструктуру проекта: конфигурацию, логирование,
слой `Driver`, структуру каталогов и команды разработки. Бизнес-логика мониторинга,
сценарии Playwright, запросы к YCLIENTS и отправка реальных уведомлений не реализованы.

## Стек

- Node.js 22+
- TypeScript, ESM
- Playwright
- Telegraf
- dotenv, Joi
- Pino, pino-pretty
- tsx
- ESLint, Prettier
- cron

## Структура

```text
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

## Конфигурация

Скопируйте `.env.example` в `.env` и заполните значения перед будущим запуском
реальной бизнес-логики.

```bash
cp .env.example .env
```

`pino-pretty` используется только при `NODE_ENV=development`. Логи также пишутся в
`app.log` и `error.log` в корне проекта.

## Команды

```bash
npm run dev           # запуск через tsx watch
npm run build         # сборка в dist
npm run start         # запуск собранной версии
```
