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
import { TStyleProps } from '../RenderNode';

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
export function getStyle(node: Element): TStyleProps {
  let styleObj: TStyleProps = {};
  const uuid = getUuid(node);
  if (uuid) {
    // fromEntries node 12 才可用
    styleObj = Object.fromEntries(window.elementPropertyMap.get(uuid) || defaultMap);
  }
  return styleObj;
}

const ignoreAttrs = ['class', 'id', 'style', UUID_ATTR];
const datasetReg = /^data-.+/;


const boolAttr = ['disabled', 'checked', 'muted', 'required', 'reversed', 'selected'];

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
      // boolean attribute nodeValue is empty string
      if (boolAttr.includes(attrName)) {
        attrObj[attrName] = true;
      } else {
        attrObj[attrName] = attr.nodeValue ?? '';
      }
    }
  }

  return attrObj;
}

/**
 * 获取节点的位置、大小信息
 *
 * @export
 * @param {Element} node
 * @returns {[x, y, left, tope Width, Left]}
 */
export function getRect(node: Element, coordinate: { x: number; y: number }): INodeRect {
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

/**
 * TODO: Elements with pointer-events set to none will be ignored, and the element below it will be returned.
 *
 * @param domNode
 * @param rect
 * @param displayGridGap
 */
export function getDisplayRate(domNode: HTMLElement, rect: INodeRect, displayGridGap: number): number {
  if (rect.width === 0 || rect.height === 0) {
    return 1;
  }
  // eslint-disable-next-line no-mixed-operators
  const rowEdge = rect.x + rect.width - 0.1;
  // eslint-disable-next-line no-mixed-operators
  const colEdge = rect.y + rect.height - 0.1;

  // FIXME: why this sentance will cause timeout
  // displayGridGap = Math.min(Math.min(rect.width, rect.height) / 10, displayGridGap);

  let displayCount = 0;
  let totalAreaCount = 0;

  for (let rowGrid = rect.x + 0.1; rowGrid <= rowEdge; rowGrid += displayGridGap) {
    for (let colGrid = rect.y + 0.1; colGrid <= colEdge; colGrid += displayGridGap) {
      totalAreaCount++;
      const topNode = document.elementFromPoint(rowGrid, colGrid);
      if (topNode === domNode) {
        displayCount++;
        // var col = document.createElement('div');
        // col.style.position = 'absolute';
        // col.style.left = colGrid + "px";
        // col.style.height = '1000px';
        // col.style.width = '1px';
        // col.style.backgroundColor = '#000';
        // document.body.appendChild(col);

        // var div = document.createElement('div');
        // div.style.position = 'absolute';
        // div.style.left = rowGrid + "px";
        // div.style.top = colGrid + "px";
        // div.style.width = '3px';
        // div.style.height = '3px';
        // div.style.backgroundColor = 'green';
        // document.body.appendChild(div);
      }
      // const row = document.createElement('div');
      // row.style.position = 'absolute';
      // row.style.top = `${rowGrid}px`;
      // row.style.width = '1000px';
      // row.style.height = '1px';
      // row.style.backgroundColor = '#000';
      // document.body.appendChild(row);
    }
  }

  return Number(((displayCount / totalAreaCount) * 100).toFixed(2));
}
