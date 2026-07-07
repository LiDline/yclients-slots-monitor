import pino, { type Logger, type StreamEntry } from 'pino';

export function createLogger(): Logger {
  const streams: StreamEntry[] = [
    {
      level: 'debug',
      stream: pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }),
    },
    {
      level: 'info',
      stream: pino.destination({ dest: 'app.log', sync: false }),
    },
    {
      level: 'error',
      stream: pino.destination({ dest: 'error.log', sync: false }),
    },
  ];

  return pino(
    {
      level: 'debug',
      base: null,
    },
    pino.multistream(streams),
  );
}
