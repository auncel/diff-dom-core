import { Browser } from 'puppeteer';
import { PageManager } from './PageManager';
export declare class Puppeteer {
    private static browser;
    private static pageManager;
    static getBrowser(): Promise<Browser>;
    static getPageManager({ poolSize }?: {
        poolSize?: number;
    }): Promise<PageManager>;
    static close(): Promise<void>;
}
