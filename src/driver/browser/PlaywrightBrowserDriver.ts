import { chromium } from 'playwright';

import type {
  Browser,
  BrowserContext,
  BrowserDriver,
  LaunchOptions,
  Page,
} from './interface/interface.js';
import type { PlaywrightBrowserDriverConfig } from './interface/interface.js';

export class PlaywrightBrowserDriver implements BrowserDriver {
  public constructor(private readonly config: PlaywrightBrowserDriverConfig = {}) {}

  public launchChromium(options?: LaunchOptions): Promise<Browser> {
    return chromium.launch({
      ...this.config.launchOptions,
      ...options,
    });
  }

  public newContext(browser: Browser): Promise<BrowserContext> {
    return browser.newContext();
  }

  public newPage(context: BrowserContext): Promise<Page> {
    return context.newPage();
  }

  public close(browser: Browser): Promise<void> {
    return browser.close();
  }
}
