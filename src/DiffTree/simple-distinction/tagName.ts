/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 5:19 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 5:19 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable import/no-unresolved */

import { IDistinctionDetail, DistinctionType } from '../DiffNode';
import { createDistinction } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';

export function identifyTagNameDistinction(
  newNode: ElementRenderNode, oldNode: ElementRenderNode,
): IDistinctionDetail<string> {
  if (newNode.nodeName !== oldNode.nodeName) {
    return createDistinction<string>(
      'tagName',
      DistinctionType.INEQUAL,
      newNode.nodeName,
      oldNode.nodeName,
    );
  }
  return createDistinction<string>(
    'tagName',
    DistinctionType.EQUALITY,
  );
}
