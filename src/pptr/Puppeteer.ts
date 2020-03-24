import { Browser, launch } from 'puppeteer';
import { PageManager } from './PageManager';
import { MAX_PAGE_POOL_SIZE } from './constants';

export class Puppeteer {
  private static browser: Browser | null = null;
  private static pageManager: PageManager | null = null;

  public static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      // log.info(`start launch puppeteer at ${Date.now()}`);
      // console.time('puppeteer launch');
      this.browser = await launch({
        args: ['--no-sandbox'],
        defaultViewport: {
          width: 1519, // base on my computer: acer Aspire VX15
          height: 824,
        },
      });
      // console.timeEnd('puppeteer launch');
      // log.info(`launch puppeterr at ${Date.now()}`);
      // 注册异常退出回调
      process.on('uncaughtException', async (err) => {
        // log.error('uncaughtException', err.message);
        console.log(err);
        await Puppeteer.close();
      });
    }
    return this.browser;
  }

  public static async getPageManager({ poolSize = MAX_PAGE_POOL_SIZE } = {}): Promise<PageManager> {
    if (!this.pageManager) {
      this.pageManager = new PageManager(poolSize);
      const browser = await Puppeteer.getBrowser();
      await this.pageManager.initPagePool(browser);
    }
    return this.pageManager;
  }

  public static async close(): Promise<void> {
    if (this.browser) {
      await this.pageManager?.closeAll();
      this.pageManager = null;
      this.browser.close();
      this.browser = null;
    }
  }
}
