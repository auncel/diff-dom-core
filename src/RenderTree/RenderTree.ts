/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 18th March 2020 11:51 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 18th March 2020 11:51 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { TTag } from '../RenderNode/element';
import { getAttrs, getStyle, getRect, getUuid, getCssValue } from './utils';
import { IGenerateRenderTreeOptions, mergeWithDefaultConfig } from '../config';
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';
import { NodeType } from '../RenderNode/enum';
import { UnionRenderNode } from '../RenderNode/RenderNode';
import { computeElementStyle } from './getCSSPropertyValues';
import { appendUuid } from './appendUuid';

export class RenderTree {
  private config: IGenerateRenderTreeOptions;

  constructor(config: IGenerateRenderTreeOptions = {}) {
    this.config = mergeWithDefaultConfig(config);
  }

  generate(root: HTMLElement): UnionRenderNode {
    const doc = document;
    // 1. 附加 uuid
    appendUuid(doc);

    // 2.  计算 style
    window.elementPropertyMap = computeElementStyle(document);

    return this.depthFirstTraversal(root, { x: 0, y: 0 });
  }


  /**
 * Depth-first traversal
 *
 * @param {Element} domNode
 * @param {UnionRenderNode} renderNode
 */
  // eslint-disable-next-line class-methods-use-this
  depthFirstTraversal(
    domNode: HTMLElement,
    coordinate: {x: number; y: number},
  ): UnionRenderNode {
    const config = this.config;
    let renderNode: UnionRenderNode;
    if (domNode.nodeType === NodeType.ELEMENT_NODE) {
      const tagName = domNode.tagName as TTag;
      renderNode = new ElementRenderNode(tagName);
      renderNode.id = domNode.id;
      renderNode.className = domNode.className;
      renderNode.nodeType = NodeType.ELEMENT_NODE;
      if (renderNode.index === -1) {
        renderNode.index = 0;
      }

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
              const textChild = new TextRenderNode(text);
              textChild.index = i;
              renderNode.append(textChild);
            }
          } else if (childNode.nodeType === NodeType.ELEMENT_NODE) {
            if (getCssValue(childNode, 'display') !== 'none') {
              const elementChild = this.depthFirstTraversal(childNode, nextCoordinate);
              elementChild.index = i;
              renderNode.append(elementChild);
            }
          }
        }
      }
    } else if (domNode.nodeType === NodeType.TEXT_NODE) {
      renderNode = new TextRenderNode(domNode.nodeValue ?? '');
    }

    return renderNode!;
  }
}
