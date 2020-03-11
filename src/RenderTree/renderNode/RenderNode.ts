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
import { NodeType } from './domCore';
import TreeNode, { TTreeNodeCallback } from './TreeNode';
import ElementRenderNode from './ElementRenderNode';
import TextRenderNode from './TextRenderNode';
import { TTag } from './element';

export type TRenderNode = ElementRenderNode | TextRenderNode;

// export default class RenderNode extends TreeNode {
//   text: string;
//   children: Set<TRenderNode>;
//   nodeType: NodeType;

//   constructor(nodeType: NodeType = NodeType.ELEMENT_NODE, tagName: TTag): void;
//   constructor(nodeType: NodeType = NodeType.TEXT_NODE, text: string = ''): void;
//   constructor(nodeType: NodeType, tagName = '') {
//     if (nodeType === NodeType.ELEMENT_NODE)
//   }

// }
