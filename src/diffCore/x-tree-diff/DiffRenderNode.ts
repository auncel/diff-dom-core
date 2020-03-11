/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 11:02 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 11:02 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IRenderNode, ITreeNode } from '../../renderNode/domCore';
import ElementRenderNode from 'lib/renderNode/ElementRenderNode';
import { TRenderNode } from 'lib/renderNode/RenderNode';

export enum DiffRenderNodeType {
  EQUALITY,
  INEQUAL,
  MISSING,
  EXTRA,
}

export class DiffRenderNode extends ElementRenderNode {
  diffType: DiffRenderNodeType;
  diffPtr: ElementRenderNode;
}
