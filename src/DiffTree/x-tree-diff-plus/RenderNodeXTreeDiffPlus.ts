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
import { DiffNode, DiffType } from '../../DiffTree/DiffNode';

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

export default class RenderTreeXTreeDiffPlus extends XTreeDiffPlus<UnionRenderNode, UnionRenderNode> {
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
    function traverse(xTreeNode: XTree<UnionRenderNode>): DiffNode {
      const originNode = xTreeNode.data!;
      let diffNode: DiffNode = new DiffNode();

      // eslint-disable-next-line default-case
      switch (xTreeNode.Op) {
        case EditOption.INS: {
          diffNode = new DiffNode();
          diffNode.diffType |= DiffType.NodeInsert;
          diffNode.index = xTreeNode.index;
          diffNode.subTree = originNode;
          return diffNode;
        }
        case EditOption.UPD: {
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            diffNode = DiffNode.createDiffNode(
              originNode,
              equivalenceShadowNode.data!,
            );
            diffNode.diffType |= DiffType.NodeUpdate;
          }
          break;
        }
        // MOV means the nodes are equal, but not its order
        case EditOption.MOV: {
          console.log('EditOption.MOV');
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            diffNode = DiffNode.createDiffNode(
              originNode,
              equivalenceShadowNode.data!,
            );
            diffNode.diffType |= DiffType.NodeMove;
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

      // eslint-disable-next-line no-unused-expressions
      xTreeNode?.nPtr?.forEach((node: XTree<UnionRenderNode>) => {
        if (node.Op === EditOption.DEL) {
          const childDiffNode = new DiffNode();
          childDiffNode.diffType |= DiffType.NodeDelete;
          childDiffNode.index = node.index;
          childDiffNode.subTree = node.data;
          diffNode.append(childDiffNode);
        }
      });

      xTreeNode.forEach((node: XTree<UnionRenderNode>) => {
        // eslint-disable-next-line no-unused-expressions
        if (typeof node.data !== 'undefined') {
          const diffChild = traverse(node);
          // console.log(diffChild);
          diffNode.append(diffChild);
        }
      });

      diffNode.index = xTreeNode.index;
      // sort children
      diffNode.sort<DiffNode>((a, b) => a.index - b.index);
      return diffNode;
    }

    return { oldTree: null, newTree: traverse(newRoot) };
  }
}
