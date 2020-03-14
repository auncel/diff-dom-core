/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 5:36 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 5:36 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable import/no-unresolved */

import { IDistinctionDetail, DistinctionType } from '../DiffNode';
import { createDistinction } from '../utils';
import TextRenderNode from '../../RenderNode/TextRenderNode';

export function identifyTextDistinction(
  newNode: TextRenderNode, oldNode: TextRenderNode,
): IDistinctionDetail<string> {
  if (newNode.text && oldNode.text && newNode.text !== oldNode.text) {
    return createDistinction<string>(
      'text',
      DistinctionType.INEQUAL,
      oldNode.text,
      newNode.text,
    );
  }
  return createDistinction<string>(
    'text',
    DistinctionType.EQUALITY,
  );
}
