/* --------------------------------------------------------------------------*
* Description: 实现 Dom 树的严格比较                                         *
*                                                                           *
* File Created: Monday, 25th November 2019 10:43 pm                         *
* Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
*                                                                           *
* Last Modified: Tuesday, 26th November 2019 9:44 pm                        *
* Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
*                                                                           *
* Copyright 2019 - 2019 Mozilla Public License 2.0 License                                         *
*-------------------------------------------------------------------------- */
import { IStrictlyEqualOption, strictlyEqualOption } from '../../../config';
import { isElementType } from '../../utils';
import { DiffNode } from '../../DiffNode';
import { UnionRenderNode } from '../../x-tree-diff-plus/RenderNodeXTreeDiffPlus';
import { NodeType } from '../../../RenderNode/enum';

/**
 * Depth-first traversal
 *
 * @param {IRenderNode} left
 * @param {IRenderNode} right
 */
function strictEqualDeepFirstTraversal(
  left: UnionRenderNode, right: UnionRenderNode, config: IStrictlyEqualOption,
): DiffNode {
  let diffNode: DiffNode;
  if (isElementType(left) && isElementType(right)) {
    diffNode = DiffNode.createDiffNode(left, right);

    if (left.children && left.children.length && right.children && right.children.length) {
      diffNode.children = [];
      for (let i = 0; i < left.children.length; i++) {
        const childDiffNode = strictEqualDeepFirstTraversal(left.get(i), right.get(i), config);
        diffNode.children.push(childDiffNode);
      }
    }
    return diffNode;
  } else if (left.nodeType === NodeType.TEXT_NODE && right.nodeType === NodeType.TEXT_NODE) {
    diffNode = DiffNode.createDiffNode(left, right);
  } else {
    diffNode = DiffNode.createDiffNode(left, right);
    // diffNode.diffType |= DiffType.NodeType;
    // diffNode.nodeType = createDistinction(
    //   'nodeType',
    //   DistinctionType.INEQUAL,
    //   left.nodeType,
    //   right.nodeType,
    // );
  }

  return diffNode;
}

/**
 * 不考虑 DOM 数结构不一致的情况
 *
 * @export
 * @param {IRenderNode} exemplar 样例输入
 * @param {IRenderNode} instance 实际输入
 */
export function strictEqualDiff(
  exemplar: UnionRenderNode, instance: UnionRenderNode,
): DiffNode {
  const diffRoot = strictEqualDeepFirstTraversal(exemplar, instance, strictlyEqualOption);
  return diffRoot;
}
