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
import debug from 'debug';
import { readJSFile } from '../utils/readJSFile';
import { Puppeteer } from './Puppeteer';
import { getConfig } from '../utils';

const log = debug('auncel:pptr.startup');

(async (): Promise<void> => {
  log('start up pptr!');
  if (!globalThis.diffScript && !globalThis.pageManager) {
    const diffModuleStr = await readJSFile(`${__dirname}/../../dist/diff.js`);
    const diffScript = `${diffModuleStr};
    window.generateRenderTreeOptions = ${JSON.stringify(getConfig('generation'))};
    window.Diff.generateRenderTree();`;

    log('mount diffScript to globalThis');
    globalThis.diffScript = diffScript;
    const pageManager = await Puppeteer.getPageManager();
    log('mount pageManager to globalThis');
    globalThis.pageManager = pageManager;
  }
})();
