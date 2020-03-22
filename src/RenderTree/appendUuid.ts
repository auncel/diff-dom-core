/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Monday, 2nd December 2019 10:16 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Monday, 2nd December 2019 10:16 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { getUuid, setUuid } from './utils';

export const UUID_ATTR = '__uuid__';

/**
 * 获得 uuid 最后一个数字
 *
 * @param {string} uuid
 * @returns {number}
 */
function getLastOrderNumber(uuid: string): number {
  return Number(uuid.substring(uuid.lastIndexOf('_') + 1));
}

export function appendUuid(doc: Document): void {
  const treeWalker = doc.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode() {
        return NodeFilter.FILTER_ACCEPT;
      },
    },
    false,
  );

  doc.body.setAttribute(UUID_ATTR, 'uuid_0');
  while (treeWalker.nextNode()) {
    const current: Element = treeWalker.currentNode as Element;
    const parent: Element = current.parentNode as Element;
    const parentUuid: string = getUuid(parent);
    const firstChild: Element = parent.firstElementChild as Element;
    if (current.isEqualNode(firstChild)) {
      setUuid(current, `${parentUuid}_0`);
    } else {
      const prevSibling = current.previousElementSibling;
      if (prevSibling) {
        const prevSiblingUuid = getUuid(prevSibling);
        setUuid(current, `${parentUuid}_${getLastOrderNumber(prevSiblingUuid) + 1}`);
      }
    }
  }
}
