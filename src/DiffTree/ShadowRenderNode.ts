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
/* eslint-disable max-len */
import RenderNode, { IRenderNode } from '../RenderNode/RenderNode';
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';

export enum ShadowDiffType {
  NONE = 0b0,
  SHADOW_NODE = 0b1,
  SHADOW_CHILDREN = 0b10,
  EXTRA_NODE = 0b100,
  MISSING_NODE = 0b1000,
  MOVED_NODE = 0b10000,
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ShadowRenderNode
  extends RenderNode,
    Omit<ElementRenderNode, 'tagName' | 'nodeType' | 'parent' | 'children' | 'hasChildren' | 'forEach' | 'append'>,
    Omit<TextRenderNode, 'tagName' | 'nodeType' | 'parent' | 'children' | 'hasChildren' | 'forEach' | 'append'> {
  diffType: ShadowDiffType;
  shadowNode: ShadowRenderNode;
  shadowChildren: ShadowRenderNode[];
}

class ShadowRenderNode extends RenderNode {
  public diffType: ShadowDiffType = ShadowDiffType.NONE;
  public shadowNode: ShadowRenderNode = null;
  public shadowChildren: ShadowRenderNode[] = [];

  constructor(renderNode: RenderNode | IRenderNode) {
    super();
    Object.assign(this, renderNode);
  }
}

export default ShadowRenderNode;
