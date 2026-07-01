import type { Browser, BrowserContext, LaunchOptions, Page } from './interface.js';

export interface BrowserDriver {
  launchChromium(options?: LaunchOptions): Promise<Browser>;
  newContext(browser: Browser): Promise<BrowserContext>;
  newPage(context: BrowserContext): Promise<Page>;
  close(browser: Browser): Promise<void>;
}
