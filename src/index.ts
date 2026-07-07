import { openBookingPage } from './browser/index.js';
import { loadConfig } from './config/index.js';
import { PlaywrightBrowserDriver } from './driver/browser/index.js';
import { createLogger } from './logger/index.js';

const config = loadConfig();
const logger = createLogger(config);
const browserDriver = new PlaywrightBrowserDriver();
const openedBookingPage = await openBookingPage({
  browserDriver,
  bookingUrl: config.yclients.bookingUrl,
});

logger.info(
  { environment: config.nodeEnv, url: openedBookingPage.page.url() },
  'YCLIENTS booking page opened',
);

await browserDriver.close(openedBookingPage.browser);
