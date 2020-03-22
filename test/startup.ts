/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 8:39 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 8:39 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* global globalThis */
import { Puppeteer, PageManager } from '../src/pptr';
import { readJSFile } from '../src/utils/readJSFile';

declare global {
  var pageManager: PageManager;
  var diffScript: string;
}

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

jest.setTimeout(60_000);

beforeAll(async () => {
  if (!globalThis.diffScript && !globalThis.pageManager) {
    // eslint-disable-next-line no-shadow
    const [, pageManager] = await Promise.all([
      new Promise((resolve: Function, reject: Function) => {
        webpack(webpackConfig, (error: Error[]) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        });
      }),

      Puppeteer.getPageManager({ poolSize: 5 }),
    ]) as [undefined, PageManager];

    const diffModuleStr = await readJSFile(`${__dirname}/../dist/diff.js`);
    const diffScript = `${diffModuleStr}; window.Diff.generateRenderTree();`;
    globalThis.diffScript = diffScript;

    globalThis.pageManager = pageManager;
  }
});

afterAll(async () => {
  await Puppeteer.close();
});
