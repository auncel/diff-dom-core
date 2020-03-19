/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 9:34 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 9:34 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

/* eslint-disable no-unused-expressions */
/* global globalThis */
import { readJSFile } from '../utils/readJSFile';
import { Puppeteer } from './Puppeteer';

(async (): Promise<void> => {
  if (!globalThis.diffScript && !globalThis.pageManager) {
    const diffModuleStr = await readJSFile(`${__dirname}/../../dist/diff.js`);
    const diffScript = `${diffModuleStr}; window.Diff.generateRenderTree();`;
    globalThis.diffScript = diffScript;
    const pageManager = await Puppeteer.getPageManager();
    globalThis.pageManager = pageManager;
  }
})();
