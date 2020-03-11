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

export type TTreeNodeCallback<T extends TreeNode = TreeNode> = (
  node: T,
  index?: number,
  thisArg?: TreeNode | TreeNode[]
) => void | T;

export interface ITreeNode {
  parent?: TreeNode;
  children: TreeNode[];
}

abstract class TreeNode {
  parent?: TreeNode;
  children: TreeNode[] = [];

  hasChildren(): boolean {
    return this.children.length !== 0;
  }

  get<T extends TreeNode = TreeNode>(index: number): T {
    if (index >= this.children.length) {
      throw RangeError('node index out of range');
    }
    return this.children[index] as T;
  }

  forEach<T extends TreeNode = TreeNode>(callback: TTreeNodeCallback<T>): void {
    this.children.forEach((node: T, index) => {
      callback(node, index, this);
    });
  }

  map<T extends TreeNode = TreeNode>(callback: TTreeNodeCallback<T>): T[] {
    return this.children.map((node: T, index) =>
      callback(node, index, this) as T,
    );
  }

  set<T extends TreeNode = TreeNode>(index: number, child: T): void {
    this.children[index] = child;
  }
  append<T extends TreeNode = TreeNode>(child: T | T[]): void {
    if (Array.isArray(child)) {
      child.forEach(node => this.children.push(node));
    } else {
      this.children.push(child);
    }
  }

  clear(): void {
    this.children.length = 0;
  }
}

export default TreeNode;
