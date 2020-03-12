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

import { NodeType } from '../../RenderNode/domCore';
// why???
import {
  XTreeDiffPlus, XTree, NodeType as XTreeNodeType, EditOption,
} from '@dovyih/x-tree-diff-plus';
import ShadowRenderNode, { ShadowDiffType } from '../ShadowRenderNode';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import TextRenderNode from '../../RenderNode/TextRenderNode';
import RenderNode from '../../RenderNode/RenderNode';

export default class RenderNodeXTreeDiff extends XTreeDiffPlus<RenderNode> {
  public buildXTree(root: ElementRenderNode): XTree<ShadowRenderNode> {
    function diffRenderNode2XTree(
      renderNode: ElementRenderNode | TextRenderNode, index: number,
    ): XTree<ShadowRenderNode> {
      const shadowNode = new ShadowRenderNode(renderNode);
      switch (renderNode.nodeType) {
        case NodeType.ELEMENT_NODE: {
          const xTreeNode = new XTree<ShadowRenderNode>({
            label: renderNode.tagName,
            index,
            type: XTreeNodeType.ELEMENT,
            data: shadowNode,
          });
          renderNode.forEach((child, idx) => {
            const childXTreeNode = diffRenderNode2XTree(child as ElementRenderNode, idx);
            xTreeNode.append(childXTreeNode);
          });
          return xTreeNode;
        }
        case NodeType.TEXT_NODE: {
          return new XTree({
            type: XTreeNodeType.TEXT,
            index,
            value: renderNode.text,
            data: shadowNode,
          });
        }
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw TypeError(`Unkown NodeType: ${(renderNode as any)?.nodeType}`);
      }
    }
    return diffRenderNode2XTree(root, 1);
  }

  /**
   *
   * @param {XTree<ShadowRenderNode>} rootA
   */
  public dumpXTree(rootA: XTree<ShadowRenderNode>): ShadowRenderNode {
    // rootA.data.diffType = ShadowDiffType.NONE;
    const stack1: XTree<ShadowRenderNode>[] = [rootA];

    rootA.data.parent = null;
    while (stack1.length) {
      const nodeA = stack1.pop();
      const shadowNode = nodeA.data;
      switch (nodeA.Op) {
        case EditOption.DEL: {
          shadowNode.diffType ^= ShadowDiffType.MISSING_NODE;

          const nodeBParent: XTree<ShadowRenderNode> = nodeA?.pPtr?.nPtr;
          if (nodeBParent) {
            const shadowNodeB = nodeBParent.data;
            shadowNodeB.diffType ^= ShadowDiffType.SHADOW_CHILDREN;
            shadowNodeB.shadowChildren[nodeA.index] = shadowNode;
          }

          break;
        }
        case EditOption.INS: {
          shadowNode.diffType ^= ShadowDiffType.EXTRA_NODE;
          const nodeBParent: XTree<ShadowRenderNode> = nodeA?.pPtr?.nPtr;
          if (nodeBParent) {
            const shadowNodeB = nodeBParent.data;
            shadowNodeB.diffType ^= ShadowDiffType.SHADOW_CHILDREN;
            shadowNodeB.shadowChildren[nodeA.index] = shadowNode;
          }
          break;
        }
        // MOV means the node is equal, but its order not
        case EditOption.MOV: {
          shadowNode.diffType ^= ShadowDiffType.MOVED_NODE;
          if (shadowNode.parent === null) break;
          const nodeAParent = nodeA.pPtr;
          const nodeB: XTree<ShadowRenderNode> = nodeA?.nPtr;
          if (nodeB) {
            nodeAParent.data.diffType ^= ShadowDiffType.SHADOW_CHILDREN;
            shadowNode.shadowChildren[nodeB.index] = shadowNode;
          }
          break;
        }
        case EditOption.UPD: {
          shadowNode.diffType ^= ShadowDiffType.SHADOW_NODE;
          shadowNode.shadowNode = new ShadowRenderNode(nodeA.nPtr.data as RenderNode);
          break;
        }
        default:
          shadowNode.diffType ^= ShadowDiffType.NONE;
      }

      if (nodeA.hasChildren()) {
        nodeA.forEach((node: XTree<ShadowRenderNode>, index) => {
          // add parent link
          node.data.parent = nodeA.data;
          // rebuild tree link
          nodeA.data.set<ShadowRenderNode>(index, node.data);
          stack1.push(node);
        });
      }
    }

    return rootA.data;
  }
}
