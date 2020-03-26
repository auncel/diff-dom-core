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
export class TagNameDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T= Str>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    if (rightNode.nodeName !== leftNode.nodeName) {
      return [
        createDistinction<T>(
          'tagName',
          DistinctionType.INEQUAL,
          rightNode.nodeName as unknown as T,
          leftNode.nodeName as unknown as T,
        ),
      ];
    }
    return [
      createDistinction<T>(
        'tagName',
        DistinctionType.EQUALITY,
      ),
    ];
  }
}
