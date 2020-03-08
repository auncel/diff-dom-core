import { Page, Browser } from 'puppeteer';
export declare class PageManager {
    private pagePool;
    private isCreating;
    private poolSize;
    constructor(poolSize?: number);
    getAvailablePoolSize(): number;
    initPagePool(browser: Browser): Promise<void>;
    getPage(): Promise<Page>;
    releasePage(page: Page): Promise<void>;
    closeAll(): Promise<void>;
}
