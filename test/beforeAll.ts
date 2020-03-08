/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 9:15 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 9:15 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-extraneous-dependencies */

import { Puppeteer, PageManager } from '../lib/pptr/index';
import { readJSFile } from '../lib/utils/readJSFile';

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

export let M_diffScript = '';
export let pageManager: PageManager = null;

export default function diffBeforeAll() {
  beforeAll(() => Promise.all([
    // 编译 ts
    new Promise((resolve, reject) => {
      webpack(webpackConfig, (error, stats) => {
        if (!error) {
          resolve();
        } else {
          reject(error);
        }
      });
    }).then(() => readJSFile(`${__dirname}/../dist/diff.js`)).then((diffModuleStr) => {
      M_diffScript = `${diffModuleStr}; window.Diff.generateRenderTree();`;
    }),
    // 获取 puppeteer 实例
    Puppeteer
      .getPageManager()
      .then((manager) => {
        pageManager = manager;
      }),
  ]).catch((err) => { throw err; }), 60 * 1000); // 1 分钟超时
}
