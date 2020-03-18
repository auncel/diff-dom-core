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
import { IFixtureData } from '../fixtures/readFixture';
import { createHTMLTpl } from '../src/utils';
import { IElementRenderNode } from '../src/RenderNode/ElementRenderNode';
import { PageManager } from '../src/pptr';

declare global {
  var pageManager: PageManager;
  var M_diffScript: string;
}


export async function getRenderTree(fixtureData: IFixtureData): Promise<IElementRenderNode> {
  if (globalThis.pageManager && globalThis.M_diffScript) {
    const { fragment, stylesheet } = fixtureData;
    const html = createHTMLTpl(fragment, stylesheet);
    const page = await globalThis.pageManager.getPage();
    await page.setContent(html);
    const renderTree: IElementRenderNode = (await page.evaluate(globalThis.M_diffScript) as IElementRenderNode);
    globalThis.pageManager.releasePage(page);
    return renderTree;
  }
  throw new Error('must import starup.ts before using getRenderTree');
}
