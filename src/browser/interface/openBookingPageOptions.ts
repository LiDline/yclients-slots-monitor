import type { BrowserDriver } from '../../driver/browser/index.js';

export interface OpenBookingPageOptions {
  readonly browserDriver: BrowserDriver;
  readonly bookingUrl: string;
}
