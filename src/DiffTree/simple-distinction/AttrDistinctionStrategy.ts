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
import { IAttrEvaluationOption } from '../../config';
import { TAttrPropertyType, IDistinctionDetail, DistinctionType } from '../DiffNode';
import { distinctionCompare } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

export function identifyAttrDistinction(
  leftNode: ElementRenderNode, rightNode: ElementRenderNode, attrConfig: IAttrEvaluationOption,
): IDistinctionDetail<TAttrPropertyType>[] {
  if (Array.isArray(attrConfig.list)) {
    return distinctionCompare<TAttrPropertyType>(
      leftNode.attr ?? {},
      rightNode.attr ?? {},
      attrConfig.list,
    );
  }

  const distinctions: IDistinctionDetail<TAttrPropertyType>[] = distinctionCompare<TAttrPropertyType>(
    leftNode.attr ?? {},
    rightNode.attr ?? {},
    Object.keys(leftNode.attr ?? {}),
  );

  if (attrConfig.isStrict) {
    return distinctions;
  }

  return distinctions.filter(distinction => distinction.type === DistinctionType.EXTRA);
}

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
