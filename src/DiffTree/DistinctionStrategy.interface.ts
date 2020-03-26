/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th March 2020 5:21 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th March 2020 5:21 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { UnionRenderNode } from '../RenderNode';
import { IDistinctionDetail } from './DiffNode';

export interface IDistinctionStrategy {
  distinguish<T>(leftNode: UnionRenderNode, rightNode: UnionRenderNode): IDistinctionDetail<T>[];
}
