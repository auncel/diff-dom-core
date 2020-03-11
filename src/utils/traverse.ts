/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 12:18 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 12:18 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { ITreeNode } from '../renderNode/domCore';

export type visitorFn = <T>(node: T, index: number, parent: T | null) => boolean | void;

export type TraverseNode = {
  node: ITreeNode;
  index: number;
  parent: ITreeNode | null;
}

/**
 * Depth-First pre-order Traverse
 *
 * @export
 * @param {T} root
 * @param {(node: T) => boolean} visitor
 */
export function deepFirstTraverse<T extends ITreeNode>(root: T, visitor: visitorFn): void {
  if (!root) return;
  const stack: TraverseNode[] = [{ node: root, index: 0, parent: null }];
  while (stack.length) {
    const step = stack.pop() as TraverseNode;
    const stop = visitor(step.node, step.index, step.parent);
    if (!stop && step.node.children.length) {
      step.node.children.forEach((child, index): void => {
        stack.push({ node: child as unknown as T, index, parent: step.node });
      });
    }
  }
}

/**
 * Breadth-First pre-order Traverse
 *
 * @export
 * @param {XTree} root
 * @param {(node: XTree) => boolean} visitor
 * @returns {void}
 */
export function breadthFirstTraverse<T extends ITreeNode>(root: T, visitor: visitorFn): void {
  if (!root) return;
  const queue: TraverseNode[] = [{ node: root, index: 0, parent: null }];
  while (queue.length) {
    const step = queue.shift() as TraverseNode;
    const stop = visitor(step.node, step.index, step.parent);
    if (!stop && step.node.children.length) {
      step.node.children.forEach((child, index) => {
        queue.push({ node: child as unknown as T, index, parent: step.node });
      });
    }
  }
}
