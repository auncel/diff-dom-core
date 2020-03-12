/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { NodeType } from '../RenderNode/domCore';
import { createTextNode } from '../utils/index';
import { TTag } from '../RenderNode/element';
import { getAttrs, getStyle, getRect, getUuid } from './utils';
import { IGenerateRenderTreeOptions, mergeWithDefaultConfig } from '../config';
import { TRenderNode } from '../RenderNode/RenderNode';
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';

/**
 * Depth-first traversal
 *
 * @param {Element} domNode
 * @param {TRenderNode} renderNode
 */
function depthFirstTraversal(
  domNode: HTMLElement,
  coordinate: {x: number; y: number},
  config: IGenerateRenderTreeOptions,
): TRenderNode {
  let renderNode: TRenderNode | null = null;
  if (domNode.nodeType === NodeType.ELEMENT_NODE) {
    const tagName = domNode.tagName as TTag;
    renderNode = new ElementRenderNode(tagName);
    renderNode.id = domNode.id;
    renderNode.className = domNode.className;
    renderNode.nodeType = NodeType.ELEMENT_NODE;

    renderNode.uuid = getUuid(domNode);
    renderNode.attr = getAttrs(domNode);
    renderNode.style = getStyle(domNode);
    renderNode.rect = getRect(domNode, coordinate);

    if (!config.noChildElement?.includes(tagName)) {
      const children = domNode.childNodes;

      let x = coordinate.x;
      if (typeof renderNode.rect.top !== 'undefined') {
        x = renderNode.rect.top;
      }
      let y = coordinate.y;
      if (typeof renderNode.rect.left !== 'undefined') {
        y = renderNode.rect.left;
      }

      const nextCoordinate = { x, y };

      for (let i = 0; i < children.length; i++) {
        const childNode = children[i] as HTMLElement;
        if (childNode.nodeType === NodeType.TEXT_NODE) {
          const text = childNode.nodeValue?.trim() ?? '';
          if (text) { // 排除空串
            const textChild = createTextNode(text);
            renderNode.append(textChild);
          }
        } else if (childNode.nodeType === NodeType.ELEMENT_NODE) {
          const elementChild = depthFirstTraversal(childNode, nextCoordinate, config);
          renderNode.append(elementChild);
        }
      }
    }
  } else if (domNode.nodeType === NodeType.TEXT_NODE) {
    renderNode = new TextRenderNode(domNode.nodeValue ?? '');
  }

  return renderNode as TRenderNode;
}

export function generateRenderTree(
  body: HTMLElement, config: IGenerateRenderTreeOptions = {},
): TRenderNode {
  mergeWithDefaultConfig(config);
  return depthFirstTraversal(body, { x: 0, y: 0 }, config);
}
