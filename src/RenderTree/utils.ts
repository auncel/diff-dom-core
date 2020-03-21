/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 1st December 2019 10:07 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 1st December 2019 10:07 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { TAttributes, TTagAttribute } from '../RenderNode/element';
import { UUID_ATTR } from './appendUuid';
import { INodeRect } from '../RenderNode/ElementRenderNode';

// eslint-disable-next-line no-unused-vars
/* global elementPropertyMap */
declare const elementPropertyMap: Map<string, Map<string, string>>;

export function getUuid(node: Element): string {
  return node.getAttribute(UUID_ATTR) ?? '';
}

export function setUuid(node: Element, value: string): void {
  node.setAttribute(UUID_ATTR, value);
}

const defaultMap = new Map();
export function getStyle(node: Element): TAttributes {
  let styleObj: TAttributes = {};
  const uuid = getUuid(node);
  if (uuid) {
    // fromEntries node 12 才可用
    styleObj = Object.fromEntries(window.elementPropertyMap.get(uuid) || defaultMap);
  }
  return styleObj;
}

const ignoreAttrs = ['class', 'id', 'style', UUID_ATTR];
const datasetReg = /^data-.+/;

/**
 * 获取元素的属性
 *
 * @param node Element node
 * @returns {TAttributes}
 */
export function getAttrs(node: Element): TAttributes {
  const attrObj: TAttributes = {};
  const attrs = node.attributes;

  for (let i = 0; i < attrs.length; i++) {
    const attr: Attr = attrs[i];
    const attrName = attr.nodeName as TTagAttribute;
    if (!ignoreAttrs.includes(attrName) && !datasetReg.test(attrName)) {
      attrObj[attrName] = attr.nodeValue ?? '';
    }
  }

  return attrObj;
}

/**
 * 获取节点的位置、大小信息
 *
 * @export
 * @param {Element} node
 * @returns [X, Y, Width, Left]
 */
export function getRect(node: Element, coordinate: {x: number; y: number}): INodeRect {
  const rect = node.getBoundingClientRect();
  const { left, top, width, height } = rect;
  return {
    x: left,
    y: top,
    left: left - coordinate.x,
    top: top - coordinate.y,
    width,
    height,
  };
}

export function getCssValue(dom: HTMLElement, property: keyof CSSStyleDeclaration): string {
  return window.getComputedStyle(dom)[property];
}

export function getDisplayRate(domNode: HTMLElement, rect: INodeRect, displayGridGap: number): number {
  const rowEdge = rect.left + rect.width;
  const colEdge = rect.top + rect.height;
  let displayCount = 0;
  let totalAreaCount = 0;

  for (let rowGrid = rect.left; rowGrid <= rowEdge; rowGrid += displayGridGap) {
    for (let colGrid = rect.top; colGrid <= colEdge; colGrid += displayGridGap) {
      totalAreaCount++;
      const topNode = document.elementFromPoint(rowGrid, colGrid);
      if (topNode === domNode) {
        displayCount++;
      }
    }
  }

  return Number(((displayCount / totalAreaCount) * 100).toFixed(2));
}
