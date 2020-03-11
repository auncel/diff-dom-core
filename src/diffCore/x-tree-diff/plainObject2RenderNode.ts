/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 12:00 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 12:00 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import ShadowRenderNode from '../../RenderNode/ShadowRenderNode';
import RenderNode, { IRenderNode } from '../../RenderNode/RenderNode';
import { NodeType } from '../../RenderNode/domCore';
import ElementRenderNode, { IElementRenderNode } from '../../RenderNode/ElementRenderNode';
import TextRenderNode, { ITextRenderNode } from '../../RenderNode/TextRenderNode';

/**
 * create shadow render node
 * @TODO why node may be null
 * @param {(null | RenderNode | IRenderNode)} node
 * @returns
 */
function createRenderNode(node: IElementRenderNode | ITextRenderNode): ElementRenderNode | TextRenderNode {
  if (node.nodeType === NodeType.ELEMENT_NODE) {
    return new ElementRenderNode(node);
  } else if (node.nodeType === NodeType.TEXT_NODE) {
    return new TextRenderNode(node.text);
  }
  throw new Error('unkonw NodeType');
}

export function plainObject2RenderNode(root: IElementRenderNode | ITextRenderNode): RenderNode {
  const renderRoot = createRenderNode(root);
  function traverse(node: IRenderNode, renderNode: ElementRenderNode | TextRenderNode): RenderNode {
    if (Array.isArray(node.children)) {
      const shadowChild = node.children.map(child =>
        traverse(
          child as unknown as IElementRenderNode | ITextRenderNode,
          createRenderNode(child as unknown as IElementRenderNode | ITextRenderNode),
        ),
      );
      // eslint-disable-next-line no-param-reassign
      if (renderNode.nodeType === NodeType.ELEMENT_NODE) {
        renderNode.clear();
        renderNode.append<RenderNode>(shadowChild);
      }
    }

    return renderNode;
  }

  return traverse(root, renderRoot);
}
