import type { OpenBookingPageOptions, OpenedBookingPage } from './interface/interface.js';

export type { OpenBookingPageOptions, OpenedBookingPage } from './interface/interface.js';

export async function openBookingPage(
  options: OpenBookingPageOptions,
): Promise<OpenedBookingPage> {
  const browser = await options.browserDriver.launchChromium();
  const context = await options.browserDriver.newContext(browser);
  const page = await options.browserDriver.newPage(context);

  await page.goto(options.bookingUrl, { waitUntil: 'domcontentloaded' });

  return {
    browser,
    context,
    page,
  };
}
