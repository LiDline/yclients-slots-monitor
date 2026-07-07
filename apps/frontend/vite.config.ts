import { unwatchFile, watchFile } from 'node:fs';
import { open } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type ViteDevServer } from 'vite';

import {
  APPLICATION_LOG_FILE_NAME,
  CLIENTS_BOOKING_URL,
  ERROR_LOG_FILE_NAME,
} from '../../src/CONST.js';
import { getApplicationLogStreamPath, type ApplicationLogName } from '../../src/logger/index.js';

const APPLICATION_LOG_FILE_PATHS: Record<ApplicationLogName, string> = {
  app: fileURLToPath(new URL(`../../${APPLICATION_LOG_FILE_NAME}`, import.meta.url)),
  error: fileURLToPath(new URL(`../../${ERROR_LOG_FILE_NAME}`, import.meta.url)),
};

type RegisterApplicationLogStreamOptions = {
  readonly applicationLogName: ApplicationLogName;
  readonly server: ViteDevServer;
};

type StreamApplicationLogOptions = {
  readonly applicationLogFilePath: string;
  readonly request: IncomingMessage;
  readonly response: ServerResponse;
};

type SendUnreadApplicationLogTextOptions = {
  readonly isInitialApplicationLogText: boolean;
};

function registerApplicationLogStream({
  applicationLogName,
  server,
}: RegisterApplicationLogStreamOptions): void {
  server.middlewares.use(getApplicationLogStreamPath(applicationLogName), (request, response) => {
    streamApplicationLog({
      applicationLogFilePath: APPLICATION_LOG_FILE_PATHS[applicationLogName],
      request,
      response,
    });
  });
}

function streamApplicationLog({
  applicationLogFilePath,
  request,
  response,
}: StreamApplicationLogOptions): void {
  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  let applicationLogFileOffset = 0;

  async function sendUnreadApplicationLogText({
    isInitialApplicationLogText,
  }: SendUnreadApplicationLogTextOptions) {
    const applicationLogFile = await open(applicationLogFilePath, 'a+');

    try {
      const applicationLogFileStats = await applicationLogFile.stat();

      if (applicationLogFileStats.size < applicationLogFileOffset) {
        applicationLogFileOffset = 0;
      }

      const applicationLogTextLength = applicationLogFileStats.size - applicationLogFileOffset;

      if (applicationLogTextLength === 0) {
        return;
      }

      const applicationLogTextBuffer = Buffer.alloc(applicationLogTextLength);

      await applicationLogFile.read(
        applicationLogTextBuffer,
        0,
        applicationLogTextLength,
        applicationLogFileOffset,
      );

      applicationLogFileOffset = applicationLogFileStats.size;

      if (isInitialApplicationLogText) {
        response.write('event: application-log-initial\n');
      }

      response.write(`data: ${JSON.stringify(applicationLogTextBuffer.toString())}\n\n`);
    } finally {
      await applicationLogFile.close();
    }
  }

  function sendChangedApplicationLogText() {
    void sendUnreadApplicationLogText({ isInitialApplicationLogText: false });
  }

  void sendUnreadApplicationLogText({ isInitialApplicationLogText: true });
  watchFile(applicationLogFilePath, { interval: 500 }, sendChangedApplicationLogText);

  request.on('close', () => {
    unwatchFile(applicationLogFilePath, sendChangedApplicationLogText);
    response.end();
  });
}

export default defineConfig({
  define: {
    __CLIENTS_BOOKING_URL__: JSON.stringify(CLIENTS_BOOKING_URL),
  },
  plugins: [
    {
      name: 'application-log-streams',
      configureServer(server) {
        registerApplicationLogStream({ applicationLogName: 'app', server });
        registerApplicationLogStream({ applicationLogName: 'error', server });
      },
    },
    react(),
    tailwindcss(),
  ],
});
