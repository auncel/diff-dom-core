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
import { IElementRenderNode } from '../src/RenderNode/ElementRenderNode';

jest.setTimeout(100_000);
declare global {
  var diffScript: string;
}

const renderTreeCache = new Map<string, IElementRenderNode>();
export async function getRenderTree(fixtureData: IFixtureData): Promise<IElementRenderNode> {
  if (globalThis.diffScript) {
    if (renderTreeCache.has(fixtureData.name)) {
      return renderTreeCache.get(fixtureData.name)!;
    }
    const { fragment, stylesheet } = fixtureData;
    const html = createHTMLTpl(fragment, stylesheet);
    const renderPage = await browser.newPage();
    // await jestPuppeteer.resetPage();
    await renderPage.setContent(html);
    const renderTree = await renderPage.evaluate(globalThis.diffScript) as IElementRenderNode;
    if (!renderPage.isClosed()) {
      await renderPage.close();
    }

    renderTreeCache.set(fixtureData.name, renderTree);
    return renderTree;
  }

  throw new Error('must import starup.ts before using getRenderTree!');
}
