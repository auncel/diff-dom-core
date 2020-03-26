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
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

type Num = number;

export class DisplayRateDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T = Num>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    if (rightNode.displayRate
      && leftNode.displayRate
      && rightNode.displayRate !== leftNode.displayRate) {
      return [
        createDistinction<T>(
          'displayRate',
          DistinctionType.INEQUAL,
          leftNode.displayRate as unknown as T,
          rightNode.displayRate as unknown as T,
        ),
      ];
    }
    return [
      createDistinction<T>(
        'displayRate',
        DistinctionType.EQUALITY,
      ),
    ];
  }
}
