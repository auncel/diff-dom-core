/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 2:28 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 2:28 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import ShadowRenderNode from '../DiffTree/ShadowRenderNode';
import { IDiffLog } from './diffLog.interface';
import { DiffNode } from '../DiffTree/DiffNode';

/**
 * shadow 节点比较函数
 *
 * @export
 * @interface INodeCompare
 */
export interface INodeCompare {
   (shadowNode: DiffNode, diffLogs: IDiffLog[]): number;
 }
