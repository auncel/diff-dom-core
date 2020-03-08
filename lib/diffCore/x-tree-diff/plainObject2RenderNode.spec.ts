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
import { plainObject2RenderNode } from './plainObject2RenderNode'
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import ShadowRenderNode from '../../RenderNode/ShadowRenderNode';
// const diffTree = require('../../../fixtures/render/diff-tree.json');

describe('RenderNode2ShadowRenderNode', () => {
  test('{tagName: div}.children{tagName: div}', () => {
    const renderTree = new ElementRenderNode('div');
    renderTree.append(new ElementRenderNode('span'));
    const shadowTree = plainObject2RenderNode(renderTree)
    expect(shadowTree instanceof ShadowRenderNode).toBe(true);
    expect(shadowTree.get(0) instanceof ShadowRenderNode).toBe(true);
  });
});
