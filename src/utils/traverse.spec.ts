/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 2:44 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 2:44 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { deepFirstTraverse, breadthFirstTraverse } from './traverse'
import { TreeNode } from '../RenderNode';

let gId = 0;
class MockNode extends TreeNode {
  id = -1;
  children: MockNode[] = [] 
  constructor(children: MockNode[]) {
    super();
    this.id = gId++;
    this.children = children;
  }
}

describe('utils/traverse', () => {

  const root = new MockNode([
    new MockNode([
      new MockNode([]),
      new MockNode([]),
    ]),
    new MockNode([]),
  ]);

  test('if depth-First pre-order traverse is correct', () => {
    let orderArr: number[] = [];
    deepFirstTraverse<MockNode>(root, (node) => {
      orderArr.push(node.id);
    });
    expect(orderArr).toEqual([4, 2, 0, 1, 3]);
  });

  test('if breadth-First pre-order Traverse stoped', () => {
    let orderArr: number[] = [];
    breadthFirstTraverse(root, (node) => {
      orderArr.push(node.id);
      return true;
    });
    expect(orderArr).toEqual([4]);
  });

  test('if breadth-First pre-order Traverse is correct', () => {
    let orderArr: number[] = [];
    breadthFirstTraverse(root, (node) => {
      orderArr.push(node.id);
    });
    expect(orderArr).toEqual([4, 2, 3, 0, 1]);
  });

  test('if breadth-First pre-order Traverse stoped', () => {
    let orderArr: number[] = [];
    breadthFirstTraverse(root, (node) => {
      orderArr.push(node.id);
      return true;
    });
    expect(orderArr).toEqual([4]);
  });
  
});
