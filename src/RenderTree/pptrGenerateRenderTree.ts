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
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* global globalThis */
import '../pptr/startup';
import ElementRenderNode, { IElementRenderNode } from '../RenderNode/ElementRenderNode';
import { plainObject2RenderNode } from '../DiffTree/x-tree-diff-plus/plainObject2RenderNode';


export async function pptrGenerateRenderTree(htmlSnippet: string): Promise<ElementRenderNode> {
  if (globalThis.pageManager && globalThis.diffScript) {
    const page = await globalThis.pageManager.getPage();
    await page.setContent(htmlSnippet);
    const renderTree = (await page.evaluate(globalThis.diffScript) as IElementRenderNode);
    globalThis.pageManager.releasePage(page);
    return plainObject2RenderNode(renderTree);
  }
  throw new Error('globalThis.pageManager and globalThis.diffScript doesn\'t exsit');
}