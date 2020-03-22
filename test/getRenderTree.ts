/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* global globalThis */
/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 8:48 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 8:48 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import 'expect-puppeteer';
import { IFixtureData } from '../fixtures/readFixture';
import { createHTMLTpl } from '../src/utils';
import ElementRenderNode, { IElementRenderNode } from '../src/RenderNode/ElementRenderNode';

jest.setTimeout(60_000);
declare global {
  var diffScript: string;
  // eslint-disable-next-line no-redeclare
  // var page: Page;
}

const renderTreeCache = new Map<IFixtureData, ElementRenderNode>();
export async function getRenderTree(fixtureData: IFixtureData): Promise<IElementRenderNode> {
  console.log('getRenderTree');
  if (globalThis.diffScript) {
    if (renderTreeCache.has(fixtureData)) {
      return renderTreeCache.get(fixtureData)!;
    }
    const { fragment, stylesheet } = fixtureData;
    const html = createHTMLTpl(fragment, stylesheet);
    const page = await browser.newPage();
    page.setContent(html);
    console.log('before eavluate');
    const renderTree = (await page.evaluate(globalThis.diffScript) as IElementRenderNode);
    console.log('after eavluate');
    return renderTree;
  }

  throw new Error('must import starup.ts before using getRenderTree!');
}
