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

import { TNodeRect } from '../../RenderNode/ElementRenderNode';
import { distinctionCompare } from '../utils';
import { IDistinctionDetail } from '../DiffNode';

export function identifyRectDistinction(
  leftRect: TNodeRect, rightRect: TNodeRect, rectTolerance: number,
): IDistinctionDetail<number>[] {
  const distinctions = distinctionCompare<number>(
    leftRect, rightRect, ['left', 'top', 'width', 'height'],
    (leftValue: number, rightValue: number) => Math.abs(leftValue - rightValue) <= rectTolerance,
  );

  return distinctions;
}
