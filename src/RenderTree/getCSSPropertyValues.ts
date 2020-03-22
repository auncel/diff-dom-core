/* --------------------------------------------------------------------------*
 * Description: 获取 CSS 属性值                                               *
 *                                                                           *
 * File Created: Wednesday, 27th November 2019 9:36 pm                       *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 27th November 2019 9:36 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { ElementNotExistError } from '../exceptions/index';
import { parseCSS } from '../CSSTree/parseCSS';
import { USER_STYLE_ID } from '../utils/const';
import { getUuid } from './utils';

const ignorePropertis = ['z-index'];

export function computeElementStyle(document: Document): Map<string, Map<string, string>> {
  const elementStyleCache: Map<string, Map<string, string>> = new Map();
  const $userStyle = document.getElementById(USER_STYLE_ID);
  if ($userStyle === null) {
    throw new ElementNotExistError(`should have style#${USER_STYLE_ID}`);
  }
  const stylesheet = $userStyle.innerHTML;
  const selectorMap: Map<string, Set<string>> = parseCSS(stylesheet);
  // eslint-disable-next-line no-restricted-syntax
  for (const [selector, properties] of selectorMap) {
    const $elementList = document.querySelectorAll(selector);
    $elementList.forEach(($element) => {
      const elementUuid = getUuid($element);
      let propertyMap: Map<string, string> = new Map();
      if (elementStyleCache.has(elementUuid)) {
        propertyMap = elementStyleCache.get(elementUuid)!;
      } else {
        propertyMap = new Map<string, string>();
        elementStyleCache.set(elementUuid, propertyMap);
      }
      type TCSSStyleDeclarationKeys = keyof CSSStyleDeclaration;
      const elementStyle = window.getComputedStyle($element);
      properties.forEach((property) => {
        if (!ignorePropertis.includes(property)) {
          const propertyValue = elementStyle[property as TCSSStyleDeclarationKeys];
          propertyMap.set(property, propertyValue);
        }
      });
    });
  }
  return elementStyleCache;
}
