/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 5:10 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 5:10 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { TAttrPropertyType, IDistinctionDetail } from '../DiffNode';
import { distinctionCompare } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

export class AttrDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line class-methods-use-this
  distinguish<T = TAttrPropertyType>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    const distinctions = distinctionCompare<T>(
      leftNode.attr ?? {},
      rightNode.attr ?? {},
      Object.keys(leftNode.attr ?? {}),
    );

    return distinctions;
  }
}
