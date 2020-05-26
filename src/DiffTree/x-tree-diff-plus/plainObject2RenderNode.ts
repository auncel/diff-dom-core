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
import debug from 'debug';
import { NodeType } from '../../RenderNode/enum';
import ElementRenderNode, { IElementRenderNode } from '../../RenderNode/ElementRenderNode';
import TextRenderNode, { ITextRenderNode } from '../../RenderNode/TextRenderNode';

const log = debug('auncel:dom:plainObject2RenderNode');

/**
 * create shadow render node
 * @TODO why node may be null
 * @param {(null | RenderNode | IRenderNode)} node
 * @returns
 */
function createRenderNode(
  node: IElementRenderNode | ITextRenderNode,
): ElementRenderNode | TextRenderNode {
  if (node.nodeType === NodeType.ELEMENT_NODE) {
    return new ElementRenderNode(node);
  } else if (node.nodeType === NodeType.TEXT_NODE) {
    return new TextRenderNode(node.text);
  }
  log('unkonw NodeType %o', node);
  throw new Error('unkonw NodeType');
}

export function plainObject2RenderNode(
  root: IElementRenderNode | ITextRenderNode,
): ElementRenderNode {
  function traverse(
    node: IElementRenderNode | ITextRenderNode,
    renderNode: ElementRenderNode | TextRenderNode,
  ): ElementRenderNode | TextRenderNode {
    if (Array.isArray(node.children)) {
      const renderChild = (node.children as unknown as (IElementRenderNode | ITextRenderNode)[])
        .map(child => traverse(child, createRenderNode(child)));

      // eslint-disable-next-line no-param-reassign
      if (renderNode.nodeType === NodeType.ELEMENT_NODE) {
        renderNode.clear();
        renderNode.append(renderChild);
      }
    }

    return renderNode;
  }

  const renderRoot = createRenderNode(root);
  return traverse(root, renderRoot) as ElementRenderNode;
}
