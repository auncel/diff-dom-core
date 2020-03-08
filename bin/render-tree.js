/* --------------------------------------------------------------------------*
 * Filename: /Users/yidafu/Code/fe-oj/packages/diff-dom-core/bin/render-tree.js*
 * Path: /Users/yidafu/Code/fe-oj/packages/diff-dom-core                     *
 * Created Date: Wednesday, January 29th 2020, 11:32:12 pm                   *
 * Author: yidafu(dov-yih)                                                   *
 *                                                                           *
 * Copyright (c) 2020 None                                                   *
 *-------------------------------------------------------------------------- */

const { readJSFile } = require('../dist/utils/readJSFile');
const { createHTMLTpl } = require('../dist/utils');
const { Puppeteer } = require('../dist/pptr');
const { readFixture } = require('./readFixture');
require('../../common/dist/polyfill/toJSON');

/**
 * generate Render Tree
 *
 * @param {(string| {fragment:string, stylesheet?:string})} option
 * @returns {Promise<RenderNode>}
 */
module.exports = async function generateRenderTree(option) {
  let htmlStr = '';
  if (typeof filePath === 'string') {
    const htmlData = readFixture(option);
    htmlStr = createHTMLTpl(htmlData.fragment, htmlData.stylesheet);
  } else {
    htmlStr = createHTMLTpl(option.fragment, option.stylesheet);
  }
  const pageManager = await Puppeteer.getPageManager();
  const diffScript = await readJSFile(`${__dirname}/../dist/diff.js`);
  const page = await pageManager.getPage();
  await page.setContent(htmlStr,
  );
  const renderTree = await page.evaluate(
    `${diffScript}; window.Diff.generateRenderTree();`,
  );
  page.close();
  return renderTree;
};
