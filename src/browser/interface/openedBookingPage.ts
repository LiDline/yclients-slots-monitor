import type { Browser, BrowserContext, Page } from '../../driver/browser/index.js';

export interface OpenedBookingPage {
  readonly browser: Browser;
  readonly context: BrowserContext;
  readonly page: Page;
}
