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
- встроенный `fetch`
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

## Архитектурное правило Driver

Все обращения к низкоуровневым подсистемам выполняются через `Driver`.

`Driver` - тонкая stateless infrastructure-обертка над одной подсистемой. Он не
зависит от других `Driver`, не содержит бизнес-логики, retry-логики, сценариев,
ветвлений обработки ответов или оркестрации нескольких шагов.

Именование:

- интерфейс: `<System>Driver`, например `HttpDriver`;
- реализация: `<Version><System>Driver`, например `FetchHttpDriver`;
- тестовая заготовка: `Fake<System>Driver`, например `FakeHttpDriver`.

Если взаимодействие получает бизнес-смысл или требует нескольких шагов, оно должно
жить выше: в `Client`, `Service` или `UseCase`.

## Правило интерфейсов

Интерфейсы не размещаются рядом с классами, функциями или реализациями.
Для модуля с интерфейсами создается папка `interface`, а файл
`interface/interface.ts` служит единственной точкой экспорта.

Если интерфейсов несколько, каждый лежит в отдельном файле:

```text
http/
  interface/
    fetchHttpDriverConfig.ts
    httpDriver.ts
    httpDriverRequest.ts
    interface.ts
  fakeHttpDriver.ts
  fetchHttpDriver.ts
```

Импорт интерфейсов внутри проекта выполняется только через
`interface/interface.ts`.

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
npm run typecheck     # проверка TypeScript без сборки
npm run lint          # ESLint
npm run format        # форматирование Prettier
npm run format:check  # проверка форматирования
```
