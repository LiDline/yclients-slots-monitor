import pino, { type Level, type Logger, type StreamEntry } from 'pino';

import type { AppConfig } from '../config/interface/interface.js';

export function createLogger(config: Pick<AppConfig, 'logLevel' | 'nodeEnv'>): Logger {
  const streamLevel: Level = config.logLevel === 'silent' ? 'fatal' : config.logLevel;
  const streams: StreamEntry[] = [
    {
      level: streamLevel,
      stream:
        config.nodeEnv === 'development'
          ? pino.transport({
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'SYS:standard',
              },
            })
          : process.stdout,
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
      level: config.logLevel,
      base: null,
    },
    pino.multistream(streams),
  );
}
