/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 1:34 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 1:34 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IRenderNode, NodeType, TNodeRect, DiffType } from './domCore';
import { TAttributes, TTag } from './element';
import { TStyleProps } from './css';
import TreeNode from './TreeNode';

export default class ElementRenderNode extends TreeNode {
  /**
   * TODO: 完善 attribute
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
   */
  attr: TAttributes = {};

  id?: string;
  uuid?: string; // 如果元素被设置了样式，就会有这个属性
  className?: string;
  tagName?: TTag;
  nodeName?: string;
  nodeType: NodeType.ELEMENT_NODE;

  rect: TNodeRect = { top: 0, left: 0, width: 0, height: 0, y: 0, x: 0 };

  dataset?: DOMStringMap;

  style: TStyleProps = {};

  // children: ElementRenderNode[];
  text?: string; // for TEXT_NODE

  // xHash?: string; // 专门给 x-diff 算法
  // parent?: IRenderNode; // x-diff 需要
  nodeDiffType?: DiffType;

  constructor(tagName: TTag = 'div') {
    super();
    this.tagName = tagName;
  }
}

