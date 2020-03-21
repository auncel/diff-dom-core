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

import { TAttributes, TTag } from './element';
import { TStyleProps } from './css';
import RenderNode, { IRenderNode } from './RenderNode';
import { ITextRenderNode } from './TextRenderNode';
import { NodeType } from './enum';

export interface INodeRect {
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IElementRenderNode extends IRenderNode {
  attr: TAttributes;

  id?: string;
  uuid?: string;
  className?: string;

  nodeName?: string;
  nodeType: NodeType.ELEMENT_NODE;

  displayRate: number;

  rect: INodeRect;

  dataset?: DOMStringMap;

  style: TStyleProps;

  children: (IElementRenderNode | ITextRenderNode)[];
}

export default class ElementRenderNode extends RenderNode implements IElementRenderNode {
  /**
   * TODO: 完善 attribute
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
   */
  attr: TAttributes = {};

  id?: string;
  uuid?: string; // 如果元素被设置了样式，就会有这个属性
  className?: string;

  nodeName?: string;
  nodeType: NodeType.ELEMENT_NODE = NodeType.ELEMENT_NODE;

  /** @type {number} [displayRate=0] 受 z-index 属性影响，Dom 节点实际展示区域比例 */
  displayRate = 0;

  rect: INodeRect = { top: 0, left: 0, width: 0, height: 0, y: 0, x: 0 };

  dataset?: DOMStringMap;

  style: TStyleProps = {};

  children: ElementRenderNode[] = [];

  constructor(tagName: IElementRenderNode | TTag = 'div') {
    super();
    if (typeof tagName === 'string') {
      this.tagName = tagName;
    } else {
      Object.assign(this, tagName);
    }
  }
}

