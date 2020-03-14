/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:41 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 5:41 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import {
  XTreeDiffPlus, XTree, NodeType as XTreeNodeType, EditOption,
} from '@dovyih/x-tree-diff-plus';
import { NodeType } from '../../RenderNode/enum';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import TextRenderNode from '../../RenderNode/TextRenderNode';
import RenderNode from '../../RenderNode/RenderNode';
import { DiffNode } from '../../DiffTree/DiffNode';
import { DiffType } from '../../RenderNode/domCore';

export type UnionRenderNode = ElementRenderNode | TextRenderNode


function computeMoveDistance(leftNode: XTree, rightNode: XTree): number {
  const leftParentList: string[] = [];
  while (leftNode.pPtr) {
    leftParentList.push(leftNode.pPtr.tMD);
    leftNode = leftNode.pPtr;
  }

  let rightDist = 0;
  while (rightNode.pPtr) {
    const rtMD = rightNode.pPtr?.nPtr?.tMD!;
    const idx = leftParentList.indexOf(rtMD);
    rightDist++;
    if (idx !== -1) {
      return idx + 1 + rightDist;
    }
    rightNode = rightNode.pPtr;
  }
  return Infinity;
}

export default class RenderTreeXTreeDiffPlus extends XTreeDiffPlus<RenderNode, UnionRenderNode> {
  public buildXTree(root: ElementRenderNode): XTree<UnionRenderNode> {
    function renderNode2XTree(
      renderNode: ElementRenderNode | TextRenderNode, index: number,
    ): XTree<UnionRenderNode> {
      const unionNode = renderNode;

      // unionNode.location = getNodeLocal(unionNode);
      switch (renderNode.nodeType) {
        case NodeType.ELEMENT_NODE: {
          const xTreeNode = new XTree<UnionRenderNode>({
            label: renderNode.tagName,
            index,
            type: XTreeNodeType.ELEMENT,
            data: unionNode,
          });
          renderNode.forEach((child, idx) => {
            const childXTreeNode = renderNode2XTree(child as ElementRenderNode, idx);
            xTreeNode.append(childXTreeNode);
          });
          return xTreeNode;
        }
        case NodeType.TEXT_NODE: {
          return new XTree({
            type: XTreeNodeType.TEXT,
            index,
            value: renderNode.text,
            data: unionNode,
          });
        }
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw TypeError(`Unkown NodeType: ${(renderNode as any)?.nodeType}`);
      }
    }
    return renderNode2XTree(root, 1);
  }

  /**
   *
   * @param {XTree<UnionRenderNode>} newRoot
   */
  public dumpXTree(oldRoot: XTree<UnionRenderNode>, newRoot: XTree<UnionRenderNode>) {
    let diffRoot: DiffNode;
    let diffParent: DiffNode;
    const stack1: XTree<UnionRenderNode>[] = [newRoot];
    while (stack1.length) {
      const xTreeNode = stack1.pop()!;
      const originNode = xTreeNode.data!;
      let diffNode: DiffNode;

      if (originNode.parent === null) {
        diffNode = DiffNode.createDiffNode(originNode, xTreeNode.nPtr!);
        diffRoot = diffNode;
        diffParent = diffNode;
      }

      // eslint-disable-next-line default-case
      switch (xTreeNode.Op) {
        case EditOption.INS: {
          diffNode = new DiffNode();
          diffNode.diffType ^= DiffType.NodeInsert;
          diffNode.subTree = originNode;
          // eslint-disable-next-line no-continue
          continue;
          // break;
        }
        case EditOption.UPD: {
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            diffNode = DiffNode.createDiffNode(
              originNode,
              equivalenceShadowNode.data!,
            );
            diffNode.diffType ^= DiffType.NodeUpdate;
          }
          break;
        }
        // MOV means the nodes are equal, but not its order
        case EditOption.MOV: {
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            diffNode = DiffNode.createDiffNode(
              originNode,
              equivalenceShadowNode.data!,
            );
            diffNode.diffType ^= DiffType.NodeMove;
            diffNode.moveDistance = computeMoveDistance(xTreeNode, equivalenceShadowNode);
          }
          break;
        }
        case EditOption.NOP: {
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            diffNode = DiffNode.createDiffNode(
              originNode,
              equivalenceShadowNode.data!,
            );
          }
          break;
        }
      }

      diffParent!.append(diffNode!);

      if (xTreeNode.hasChildren()) {
        xTreeNode.forEach((node: XTree<UnionRenderNode>, index) => {
          if (node.nPtr) {
            node.nPtr.forEach((grandChildNode) => {
              if (grandChildNode.Op === EditOption.DEL) {
                const childDiffNode = new DiffNode();
                childDiffNode.diffType = DiffType.NodeDelete;
                diffNode.subTree = grandChildNode.data;
                diffNode.set(grandChildNode.index, childDiffNode);
              }
            });
          }

          if (typeof node.data !== 'undefined') {
            // add parent link
            node.data.parent = originNode;
            // FIXME: why need re-set children
            // rebuild tree link
            originNode.set<UnionRenderNode>(index, node.data);
            stack1.push(node);
          }
        });
      }
    }

    return { oldTree: null, newTree: diffRoot! };
  }
}
