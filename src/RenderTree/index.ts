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
import { RenderTree } from './RenderTree';
import { UnionRenderNode } from '../RenderNode/UnionRenderNode';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    elementPropertyMap: Map<string, Map<string, string>>;
  }
}

export function generateRenderTree(): UnionRenderNode {
  const body = document.body;
  const renderTree = new RenderTree().generate(body);
  return renderTree;
}
