import { Page, Browser } from 'puppeteer';
// import log from '../logger/puppeteer';
import { MAX_PAGE_POOL_SIZE } from './constants';
import sleep from '../utils/sleep';
/**
 * TODO: 当 initpageManager 时，不允许调用 getPage、releasePage
 *
 * @export
 * @class PageManager
 */
export class PageManager {
  private pagePool: Page[] = [];
  /**
   * a lock
   * @private
   * @type {boolean}
   * @memberof PageManager
   */
  private isCreating = true;

  private poolSize = 0;

  constructor(poolSize = MAX_PAGE_POOL_SIZE) {
    this.poolSize = poolSize;
  }

  public getAvailablePoolSize(): number {
    return this.pagePool.length;
  }

  public async initPagePool(browser: Browser): Promise<void> {
    this.isCreating = true;
    // log.info(`started creating ${this.poolSize} page instance at ${Date.now()}`);
    console.time(`creating ${this.poolSize} page instance`);
    const pagePromises: Promise<Page>[] = [];
    for (let i = 0; i < this.poolSize; i++) {
      pagePromises.push(browser.newPage());
    }

    const pageArr = await Promise.all(pagePromises);
    console.timeEnd(`creating ${this.poolSize} page instance`);
    // log.info(`creating ${this.poolSize} page instance finished at ${Date.now()}`);
    this.isCreating = false;
    this.pagePool.push(...pageArr);
  }

  public async getPage(): Promise<Page> {
    // TODO: retry times limit
    // wait
    while (this.isCreating || this.getAvailablePoolSize() === 0) {
      // log.warn('awaiting for get Page');
      await sleep(200);
    }

    return this.pagePool.shift();
  }

  public async releasePage(page: Page): Promise<void> {
    // TODO: 检测 page 是否已经放入
    this.pagePool.push(page);
  }

  public async closeAll(): Promise<void> {
    this.pagePool.forEach((page) => {
      page.close();
    });
    this.pagePool.length = 0;
  }
}
