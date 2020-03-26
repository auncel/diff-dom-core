/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 5:12 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 5:12 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable import/no-unresolved */

import ElementRenderNode, { INodeRect } from '../../RenderNode/ElementRenderNode';
import { distinctionCompare } from '../utils';
import { IDistinctionDetail } from '../DiffNode';
import { IDistinctionStrategy } from '../DistinctionStrategy.interface';
import { getConfig } from '../../utils';
import { IGenerateDiffTreeOption } from '../../config';

export function identifyRectDistinction(
  leftRect: INodeRect, rightRect: INodeRect, rectTolerance: number,
): IDistinctionDetail<number>[] {
  const distinctions = distinctionCompare<number>(
    leftRect, rightRect, ['left', 'top', 'width', 'height'],
    (leftValue: number, rightValue: number) => Math.abs(leftValue - rightValue) <= rectTolerance,
  );

  return distinctions;
}

type Num = number;

export class RectDistinctionStrategy implements IDistinctionStrategy {
  // eslint-disable-next-line
  distinguish<T = Num>(
    leftNode: ElementRenderNode, rightNode: ElementRenderNode,
  ): IDistinctionDetail<T>[] {
    const diffOption: IGenerateDiffTreeOption = getConfig('diff');
    const leftRect = leftNode.rect;
    const rightRect = rightNode.rect;
    const distinctions = distinctionCompare<T>(
      leftRect, rightRect, ['left', 'top', 'width', 'height'],
      (leftValue: number, rightValue: number) => Math.abs(leftValue - rightValue) <= (diffOption.rectTolerance ?? 0),
    );

    return distinctions;
  }
}
