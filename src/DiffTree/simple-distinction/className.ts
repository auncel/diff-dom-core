/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 5:27 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 5:27 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable import/no-unresolved */

import { IDistinctionDetail, DistinctionType } from '../DiffNode';
import { createDistinction } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';

export function identifyClassNameDistinction(
  newNode: ElementRenderNode, oldNode: ElementRenderNode,
): IDistinctionDetail<string> {
  if (newNode.className && oldNode.className && newNode.className !== oldNode.className) {
    return createDistinction<string>(
      'className',
      DistinctionType.INEQUAL,
      oldNode.className,
      newNode.className,
    );
  }
  return createDistinction<string>(
    'id',
    DistinctionType.EQUALITY,
  );
}
