/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 7th December 2019 9:10 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:10 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import { appendUuid } from './appendUuid';
import { generateRenderTree } from './generateRenderTree';
import { computeElementStyle } from './getCSSPropertyValues';
import { TRenderNode } from '../RenderNode/RenderNode';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    elementPropertyMap: Map<string, Map<string, string>>;
  }
}

export function generateTree(): TRenderNode {
  const doc = document;
  // 1. 附加 uuid
  appendUuid(doc);

  // 2.  计算 style
  window.elementPropertyMap = computeElementStyle(document);

  // 3. 生成 Render
  const body = document.body;
  const renderTree = generateRenderTree(body);
  return renderTree;
}
