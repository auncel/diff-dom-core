/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 11:21 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 11:27 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import  TreeNode, { TTreeNodeCallback } from './TreeNode'

class EmptyNode extends TreeNode {};
const root = new EmptyNode();
root.append([
  new EmptyNode(),
  new EmptyNode(),
]);

describe('TreeNode', () => {
  test('should TreeNode#count() to be 3', () => {
    expect(root.count()).toBe(3);
  });

  test('should TreeNode#forEach callback call 2 time', () => {
    const cbFn = jest.fn();
    root.forEach(cbFn)
    expect(cbFn.mock.calls.length).toBe(2);
  });
});
