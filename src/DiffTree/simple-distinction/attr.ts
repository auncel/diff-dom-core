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
import { IStrictlyEqualAttrOption } from '../../config';
import { TAttrPropertyType, IDistinctionDetail, DistinctionType } from '../../DiffTree/DiffNode';
import { distinctionCompare } from '../../DiffTree/utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';

export function identifyAttrDistinction(
  leftNode: ElementRenderNode, rightNode: ElementRenderNode, attrConfig: IStrictlyEqualAttrOption,
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

  if (attrConfig.isStrictlyEqual) {
    return distinctions;
  }

  return distinctions.filter(distinction => distinction.type === DistinctionType.EXTRA);
}
