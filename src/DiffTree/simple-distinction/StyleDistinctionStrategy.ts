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
/* eslint-disable import/no-unresolved */

import isEqual from 'lodash/isEqual';
import { TStyleProps } from '../../RenderNode/css';
import { IStyleEvaluationOption } from '../../config';
import { IDistinctionDetail, TCSSPropertyValueType } from '../DiffNode';
import { distinctionCompare } from '../utils';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';

/** TODO: styleConfig */
export function identifyStyleDistinction(
  // eslint-disable-next-line no-unused-vars
  leftNodeStyle: TStyleProps, rightNodeStyle: TStyleProps, styleConfig: IStyleEvaluationOption,
): IDistinctionDetail<TCSSPropertyValueType>[] {
  const keys = Object.keys(leftNodeStyle);
  const distinctions = distinctionCompare<TCSSPropertyValueType>(
    leftNodeStyle, rightNodeStyle, keys,
  );
  return distinctions;
}

export function isStyleEqual(node1: ElementRenderNode, node2: ElementRenderNode): boolean {
  return isEqual(node1.style, node2.style);
}

export class StyleDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T = TCSSPropertyValueType>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    const leftNodeStyle = leftNode.style!;
    const rightNodeStyle = rightNode.style!;
    const keys = Object.keys(leftNodeStyle);
    const distinctions = distinctionCompare<T>(
      leftNodeStyle, rightNodeStyle, keys,
    );
    return distinctions;
  }
}
