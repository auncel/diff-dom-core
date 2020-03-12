/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 2:37 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 2:37 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { NodeType } from './enum';
import TreeNode from './TreeNode';
import ElementRenderNode from './ElementRenderNode';
import TextRenderNode from './TextRenderNode';
import { TTag } from './element';

export type TRenderNode = ElementRenderNode | TextRenderNode;

export interface IRenderNode {
  children: IRenderNode[];
  nodeType: NodeType;
  tagName: TTag | '#text';
}
class RenderNode extends TreeNode implements IRenderNode {
  nodeType: NodeType = NodeType.ELEMENT_NODE;
  tagName: TTag | '#text' = 'div';
  children: RenderNode[] = [];
}

export default RenderNode;
