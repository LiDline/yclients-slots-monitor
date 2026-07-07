import assert from 'node:assert/strict';
import test from 'node:test';

import { CLIENTS_BOOKING_URL } from '../CONST.js';
import { loadConfig } from './index.js';

void test('uses clients booking url when env booking url is empty', () => {
  const config = loadConfig({
    YCLIENTS_BOOKING_URL: '',
  });

  assert.equal(config.yclients.bookingUrl, CLIENTS_BOOKING_URL);
});

void test('always uses development environment', () => {
  const config = loadConfig({
    NODE_ENV: 'production',
  });

  assert.equal(config.nodeEnv, 'development');
});

void test('does not expose log level', () => {
  const config = loadConfig();

  assert.equal(Object.hasOwn(config, 'logLevel'), false);
});

void test('does not expose yclients api base url', () => {
  const config = loadConfig({
    YCLIENTS_API_BASE_URL: 'https://example.com',
  });

  assert.equal(Object.hasOwn(config.yclients, 'apiBaseUrl'), false);
});
