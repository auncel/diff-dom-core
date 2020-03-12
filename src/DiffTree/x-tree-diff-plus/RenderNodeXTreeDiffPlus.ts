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
import ShadowRenderNode, { ShadowDiffType } from '../../ShadowNode/ShadowRenderNode';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import TextRenderNode from '../../RenderNode/TextRenderNode';
import RenderNode from '../../RenderNode/RenderNode';

export default class RenderTreeXTreeDiffPlus extends XTreeDiffPlus<RenderNode> {
  public buildXTree(root: ElementRenderNode): XTree<ShadowRenderNode> {
    function renderNode2XTree(
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
            data: shadowNode,
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
   * @param {XTree<ShadowRenderNode>} root
   */
  public dumpXTree(root: XTree<ShadowRenderNode>): ShadowRenderNode {
    // rootA.data.diffType = ShadowDiffType.NONE;
    const stack1: XTree<ShadowRenderNode>[] = [root];
    // const rootShadowNode = root.data;
    while (stack1.length) {
      const xTreeNode = stack1.pop()!;
      const shadowNode = xTreeNode.data;
      switch (xTreeNode.Op) {
        // old tree has extra node
        case EditOption.DEL: {
          shadowNode.diffType ^= ShadowDiffType.MISSING_NODE;
          const anthorXTreeParentNode = xTreeNode?.pPtr?.nPtr;
          if (anthorXTreeParentNode) {
            const shadowNodeB: ShadowRenderNode = anthorXTreeParentNode.data;
            shadowNodeB.diffType ^= ShadowDiffType.SHADOW_CHILDREN;
            shadowNodeB.shadowChildren[xTreeNode.index] = shadowNode;
          }
          break;
        }
        case EditOption.INS: {
          shadowNode.diffType ^= ShadowDiffType.EXTRA_NODE;
          break;
        }
        // MOV means the nodes are equal, but not its order
        case EditOption.UPD:
        case EditOption.MOV: {
          shadowNode.diffType ^= ShadowDiffType.MOVED_NODE;
          const equivalenceShadowNode = xTreeNode?.nPtr;
          if (equivalenceShadowNode) {
            shadowNode.shadowNode = equivalenceShadowNode.data as ShadowRenderNode;
          }
          break;
        }
        default:
          shadowNode.diffType ^= ShadowDiffType.NONE;
      }

      if (xTreeNode.hasChildren()) {
        xTreeNode.forEach((node: XTree<ShadowRenderNode>, index) => {
          // add parent link
          node.data.parent = xTreeNode.data;
          // rebuild tree link
          xTreeNode.data.set<ShadowRenderNode>(index, node.data);
          stack1.push(node);
        });
      }
    }

    return root.data;
  }
}
