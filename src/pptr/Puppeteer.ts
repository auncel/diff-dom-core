import { Browser, launch } from 'puppeteer';
import debug from 'debug';
import { PageManager } from './PageManager';
import { MAX_PAGE_POOL_SIZE } from './constants';

const log = debug('auncel:dom:Puppeteer');

export class Puppeteer {
  private static browser: Browser | null = null;
  private static pageManager: PageManager | null = null;

  /**
   * @url https://github.com/puppeteer/puppeteer/issues/4428
   * @urlhttps://github.com/browserless/chrome/issues/253
   */
  public static async getBrowser(): Promise<Browser> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise<Browser>((resovle, reject) => {
      const retryTimes = 0;
      async function setup(): Promise<void> {
        if (!that.browser) {
          log(`start launch puppeteer at ${Date.now()}`);
          // console.time('puppeteer launch');
          that.browser = await launch({
            args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
            defaultViewport: {
              width: 1519, // based on my computer: acer Aspire VX15
              height: 824,
            },
          });

          that.browser.on('disconnected', () => {
            if (retryTimes > 10) {
              reject();
            } else {
              log('pptr connect retry');
              setup();
            }
          });
          that.browser.on('targetcreated', () => resovle(that.browser!));
          log('puppeteer launched');
          // 注册异常退出回调
          process.on('uncaughtException', async (err) => {
            // log.error('uncaughtException', err.message);
            console.log(err);
            await Puppeteer.close();
          });
        }
        resovle(that.browser!);
      }
      setup();
    });
  }

  public static async getPageManager({ poolSize = MAX_PAGE_POOL_SIZE } = {}): Promise<PageManager> {
    if (!this.pageManager) {
      log('create a new PageManager');
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
