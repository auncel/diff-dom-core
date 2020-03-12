/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 1:23 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 1:23 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { plainObject2RenderNode } from './plainObject2RenderNode';
import ElementRenderNode, { IElementRenderNode } from '../../RenderNode/ElementRenderNode';
import { NodeType } from '../../RenderNode/enum';
import TextRenderNode, { ITextRenderNode } from '../../RenderNode/TextRenderNode';
// const diffTree = require('../../../fixtures/render/diff-tree.json');

describe('RenderNode2ShadowRenderNode', () => {
  test('{tagName: div}.children[{tagName: div}, {tagName: #text}]', () => {
    const renderTree: IElementRenderNode = {
      tagName: 'div',
      nodeType: NodeType.ELEMENT_NODE,
      attr: {},
      style: {},
      rect: {},
      children: [
        {
          tagName: 'div',
          nodeType: NodeType.ELEMENT_NODE,
          attr: {},
          style: {},
          rect: {},
          children: [],
        },
        {
          tagName: '#text',
          nodeType: NodeType.TEXT_NODE,
          text: 'text node',
        } as ITextRenderNode,
      ],
    };

    const shadowTree = plainObject2RenderNode(renderTree);
    expect(shadowTree instanceof ElementRenderNode).toBe(true);
    expect(shadowTree.get(0) instanceof ElementRenderNode).toBe(true);
    expect(shadowTree.get(1) instanceof TextRenderNode).toBe(true);
  });
});
