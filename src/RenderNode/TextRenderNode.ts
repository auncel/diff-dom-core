/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 1:42 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 1:42 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import RenderNode, { IRenderNode } from './RenderNode';
import { NodeType } from './enum';


export interface ITextRenderNode extends IRenderNode {
  text: string;
  tagName: '#text';
  nodeType: NodeType.TEXT_NODE;
}

export class TextRenderNode extends RenderNode implements ITextRenderNode {
  text: string;
  tagName = '#text' as const;
  nodeType: NodeType.TEXT_NODE = NodeType.TEXT_NODE;

  constructor(text = '') {
    super();
    this.text = text;
  }

  hasChildren(): boolean {
    return false;
  }

  // forEach(callback: TTreeNodeCallback): void {
  //   // noop
  // }

  append<TextRenderNode>(child: TextRenderNode): never {
    throw new TypeError('can\'t append dhild to Text Node');
  }
}

export default TextRenderNode;
