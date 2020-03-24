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
  index: number,
  thisArg: TreeNode | TreeNode[]
) => void | T;

export interface ITreeNode {
  parent?: TreeNode;
  children: TreeNode[];
}

export abstract class TreeNode {
  /**
   * 默认不设置 parent
   *
   * @type {(TreeNode | null)}
   * @memberof TreeNode
   */
  parent: TreeNode | null = null;
  children: TreeNode[] = [];

  count(): number {
    return this.children.reduce((acc, node) => acc + node.count(), 1);
  }

  hasChildren(): boolean {
    return this.children.length !== 0;
  }

  /**
   * get child TreeNode
   * @param index
   * @returns {T extends TreeNode = TreeNode} default T is TreeNode
   */
  get<T extends TreeNode = TreeNode>(index: number): T {
    // if (index >= this.children.length) {
    //   throw RangeError('node index out of range');
    // }
    return this.children[index] as T;
  }

  set<T extends TreeNode = TreeNode>(index: number, child: T): void {
    if (this.has(index)) {
      for (let idx = index + 1; idx <= this.children.length; idx++) {
        if (!this.has(idx)) {
          this.children[idx] = child;
        }
      }
    } else {
      this.children[index] = child;
    }
  }

  sort<T extends TreeNode = TreeNode>(compareFn?: (a: T, b: T) => number): T[] {
    return (this.children as T[]).sort(compareFn);
  }

  /**
   * nth children exist and is instanceof TreeNode
   * @param n
   */
  has(n: number): boolean {
    return this.children[n] instanceof TreeNode;
  }

  forEach<T extends TreeNode = TreeNode>(callback: TTreeNodeCallback<T>): void {
    this.children.forEach((node, index) => {
      callback(node as T, index, this);
    });
  }

  map<T extends TreeNode = TreeNode>(callback: TTreeNodeCallback<T>): T[] {
    return this.children.map<T>((node, index) =>
      callback(node as T, index, this) as T,
    );
  }

  append<T extends TreeNode = TreeNode>(child: T | T[]): void {
    if (Array.isArray(child)) {
      child.forEach((node) => {
        // node.parent = this;
        this.children.push(node);
      });
    } else {
      // child.parent = this;
      this.children.push(child);
    }
  }

  clear(): void {
    this.children.length = 0;
  }
}

export default TreeNode;
