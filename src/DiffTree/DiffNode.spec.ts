/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th March 2020 9:19 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th March 2020 9:19 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { ElementRenderNode } from "../RenderNode";
import { DiffNode } from "./DiffNode";


describe('DiffNode', () => {

  test('if DiffNode.createDiffNode', () => {
    const renderNode1 = new ElementRenderNode();
    renderNode1.attr = {
      title: 'title1',
    };

    const renderNode2 = new ElementRenderNode();
    renderNode2.attr = {
      title: 'title2',
    };

    const diffNode = DiffNode.createDiffNode(renderNode1, renderNode2);
    expect(diffNode.attr?.length).toBe(1);
    expect(diffNode.attr![0]!.actual).toBe('title2');
    expect(diffNode.attr![0]!.expect).toBe('title1');
  });

  test('if tagName is ineqaul', () => {
    const renderNode1 = new ElementRenderNode('div');
    const renderNode2 = new ElementRenderNode('span');

    const diffNode = DiffNode.createDiffNode(renderNode1, renderNode2);
    expect(diffNode.tagName?.actual).toBe('div');
    expect(diffNode.tagName?.expect).toBe('span');
  });

  test('if className is ineqaul', () => {
    const renderNode1 = new ElementRenderNode();
    renderNode1.className = 'class-1';
    const renderNode2 = new ElementRenderNode();
    renderNode2.className = 'class-2';

    const diffNode = DiffNode.createDiffNode(renderNode1, renderNode2);
    expect(diffNode.className?.actual).toBe('class-1');
    expect(diffNode.className?.expect).toBe('class-2');
  });
});