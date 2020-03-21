/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st March 2020 11:10 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st March 2020 11:10 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IDistinctionDetail, DistinctionType } from '../DiffNode';
import { createDistinction } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';

export function identifyDisplayRateDistinction(
  newNode: ElementRenderNode, oldNode: ElementRenderNode,
): IDistinctionDetail<number> {
  if (newNode.displayRate && oldNode.displayRate && newNode.displayRate !== oldNode.displayRate) {
    return createDistinction<number>(
      'displayRate',
      DistinctionType.INEQUAL,
      oldNode.displayRate,
      newNode.displayRate,
    );
  }
  return createDistinction<number>(
    'displayRate',
    DistinctionType.EQUALITY,
  );
}
