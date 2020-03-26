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
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

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
    'className',
    DistinctionType.EQUALITY,
  );
}
type Str = string;

export class ClassNameDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T = Str>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    if (leftNode.className && rightNode.className && leftNode.className !== rightNode.className) {
      return [
        createDistinction<T>(
          'className',
          DistinctionType.INEQUAL,
          rightNode.className as unknown as T,
          leftNode.className as unknown as T,
        ),
      ];
    }

    return [
      // eslint-disable-next-line
      createDistinction<T>(
        'className',
        DistinctionType.EQUALITY,
      ),
    ];
  }
}
