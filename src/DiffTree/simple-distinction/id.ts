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

export function identifyIdDistinction(
  newNode: ElementRenderNode, oldNode: ElementRenderNode,
): IDistinctionDetail<string> {
  if (newNode.id && oldNode.id && newNode.id !== oldNode.id) {
    return createDistinction<string>(
      'id',
      DistinctionType.INEQUAL,
      oldNode.id,
      newNode.id,
    );
  }
  return createDistinction<string>(
    'id',
    DistinctionType.EQUALITY,
  );
}
