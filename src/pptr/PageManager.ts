import { Page, Browser } from 'puppeteer';
// import log from '../logger/puppeteer';
import { MAX_PAGE_POOL_SIZE, DEFUALT_PAGE_POOL_SIZE } from './constants';
import sleep from '../utils/sleep';
/**
 * TODO: 当 initpageManager 时，不允许调用 getPage、releasePage
 *
 * @export
 * @class PageManager
 */
export class PageManager {
  private pagePool: Page[] = [];
  private unavilablePool: Page[] = [];
  /**
   * lock var
   * @private
   * @type {boolean}
   * @memberof PageManager
   */
  private isCreating = true;

  private defaultPoolSize = DEFUALT_PAGE_POOL_SIZE
  /**
   * max pool size
   *
   * @private
   * @memberof PageManager
   */
  private maxPoolSize = 0;

  /**
   * Creates an instance of PageManager.
   * @param {*} [maxPoolSize=MAX_PAGE_POOL_SIZE] maxPoolSize will ignore, if maxPoolSize < DEFUALT_PAGE_POOL_SIZE
   * @memberof PageManager
   */
  constructor(maxPoolSize = MAX_PAGE_POOL_SIZE) {
    this.maxPoolSize = Math.max(maxPoolSize);
  }

  public getPoolSize(): number {
    return this.pagePool.length + this.unavilablePool.length;
  }

  public getAvailablePoolSize(): number {
    return this.pagePool.length;
  }

  public async initPagePool(browser: Browser): Promise<void> {
    this.isCreating = true;

    // log.info(`started creating ${this.poolSize} page instance at ${Date.now()}`);
    // console.time(`creating ${this.defaultPoolSize} page instance`);
    const pagePromises: Promise<Page>[] = [];
    for (let i = 0; i < this.defaultPoolSize; i++) {
      pagePromises.push(browser.newPage());
    }
    const pageArr = await Promise.all(pagePromises);
    // console.timeEnd(`creating ${this.defaultPoolSize} page instance`);
    // log.info(`creating ${this.poolSize} page instance finished at ${Date.now()}`);

    this.isCreating = false;
    this.pagePool.push(...pageArr);
  }

  public async getPage(): Promise<Page> {
    if (!this.isCreating && this.getPoolSize() < this.maxPoolSize) {
      const newPage = await browser.newPage();
      this.unavilablePool.push(newPage);
      return newPage;
    }

    // TODO: retry times limitation
    while (this.isCreating || this.getAvailablePoolSize() === 0) {
      // log.warn('awaiting for get Page');
      // eslint-disable-next-line no-await-in-loop
      await sleep(200);
    }
    const reusePage = this.pagePool.shift()!;
    this.unavilablePool.push(reusePage);
    return reusePage;
  }

  public async releasePage(page: Page): Promise<void> {
    let uPage: Page | null = null;
    this.unavilablePool = this.unavilablePool.filter((unavilbalePage) => {
      if (unavilbalePage !== page) {
        return true;
      }
      uPage = unavilbalePage;
      return false;
    });

    if (uPage) {
      this.pagePool.push(uPage);
    }
  }

  public async closeAll(): Promise<void> {
    // this.pagePool.forEach((page) => {
    //   page.close();
    // });
    this.pagePool.length = 0;
  }
}
