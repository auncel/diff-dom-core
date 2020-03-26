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
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

type Str = string;

export class IdDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T = Str>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    if (rightNode.id && leftNode.id && rightNode.id !== leftNode.id) {
      return [
        createDistinction<T>(
          'id',
          DistinctionType.INEQUAL,
          leftNode.id as unknown as T,
          rightNode.id as unknown as T,
        ),
      ];
    }
    return [
      createDistinction<T>(
        'id',
        DistinctionType.EQUALITY,
      ),
    ];
  }
}
