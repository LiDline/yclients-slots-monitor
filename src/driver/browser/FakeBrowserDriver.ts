import type {
  Browser,
  BrowserContext,
  BrowserDriver,
  LaunchOptions,
  Page,
} from './interface/interface.js';

export class FakeBrowserDriver implements BrowserDriver {
  public readonly launchOptions: LaunchOptions[] = [];

  public constructor(
    private readonly browser: Browser,
    private readonly context: BrowserContext,
    private readonly page: Page,
  ) {}

  public launchChromium(options: LaunchOptions = {}): Promise<Browser> {
    this.launchOptions.push(options);
    return Promise.resolve(this.browser);
  }

  public newContext(): Promise<BrowserContext> {
    return Promise.resolve(this.context);
  }

  public newPage(): Promise<Page> {
    return Promise.resolve(this.page);
  }

  public close(browser: Browser): Promise<void> {
    return browser.close();
  }
}
