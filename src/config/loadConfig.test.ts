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
