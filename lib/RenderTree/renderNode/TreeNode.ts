/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 18th January 2020 1:54 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 18th January 2020 1:54 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

export type TTreeNodeCallback = (
  node: TreeNode,
  index?: number,
  thisArg?: TreeNode | TreeNode[]
) => void;

export default abstract class TreeNode {
  parent?: TreeNode;
  children: TreeNode[] = [];

  hasChildren(): boolean {
    return this.children.length !== 0;
  }

  forEach(callback: TTreeNodeCallback): void {
    let index = 1;
    this.children.forEach((node) => {
      callback(node, index, this);
      index += 1;
    });
  }

  append(child: TreeNode): void {
    this.children.push(child);
  }
}
