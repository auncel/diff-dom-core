/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 9:31 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 9:31 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* global globalThis */
import debug from 'debug';
import '../pptr/startup';
import { IElementRenderNode } from '../RenderNode/ElementRenderNode';
import sleep from '../utils/sleep';
import { IHTMLSnippet } from '../HTMLSnippet.interface';
import { createHTMLTpl } from '../utils';

const log = debug('auncel:dom:ReaderTree:pptrGenerateRenderTree');

const MAX_SLEEP_COUNT = 100;
export async function pptrGenerateRenderTree(htmlSnippet: string | IHTMLSnippet): Promise<IElementRenderNode> {
  if (typeof htmlSnippet !== 'string') {
    htmlSnippet = createHTMLTpl(htmlSnippet.html, htmlSnippet.style);
  }
  let sleepCount = 0;
  while (!globalThis.pageManager || !globalThis.diffScript) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(100);
    sleepCount++;
    if (sleepCount > MAX_SLEEP_COUNT) {
      throw new Error('globalThis.pageManager or globalThis.diffScript doesn\'t exsit');
    }
  }
  const page = await globalThis.pageManager.getPage();
  // log('generateReanderTree %s', htmlSnippet);
  await page.setContent(htmlSnippet);
  log('generate render tree starting');
  const renderTree = (await page.evaluate(globalThis.diffScript) as IElementRenderNode);
  log('successfully generate render tree');
  globalThis.pageManager.releasePage(page);
  return renderTree;
}
