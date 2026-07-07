import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import { CLIENTS_BOOKING_URL } from '../CONST.js';
import { FakeBrowserDriver } from '../driver/browser/index.js';
import type { Browser, BrowserContext, Page } from '../driver/browser/interface/interface.js';
import { openBookingPage } from './index.js';
import type { OpenedBookingPage } from './interface/interface.js';

let openedUrls: string[];
let browser: Browser;
let context: BrowserContext;
let page: Page;
let browserDriver: FakeBrowserDriver;

beforeEach(() => {
  openedUrls = [];
  browser = {
    close: () => Promise.resolve(),
  } as Browser;
  context = {} as BrowserContext;
  page = {
    goto: (openedUrl: string) => {
      openedUrls.push(openedUrl);
      return Promise.resolve(null);
    },
  } as unknown as Page;
  browserDriver = new FakeBrowserDriver(browser, context, page);
});

function openTestBookingPage(): Promise<OpenedBookingPage> {
  return openBookingPage({ browserDriver, bookingUrl: CLIENTS_BOOKING_URL });
}

void test('returns launched browser', async () => {
  const openedBookingPage = await openTestBookingPage();

  assert.equal(openedBookingPage.browser, browser);
});

void test('returns created context', async () => {
  const openedBookingPage = await openTestBookingPage();

  assert.equal(openedBookingPage.context, context);
});

void test('returns created page', async () => {
  const openedBookingPage = await openTestBookingPage();

  assert.equal(openedBookingPage.page, page);
});

void test('opens requested booking url', async () => {
  await openTestBookingPage();

  assert.deepEqual(openedUrls, [CLIENTS_BOOKING_URL]);
});
