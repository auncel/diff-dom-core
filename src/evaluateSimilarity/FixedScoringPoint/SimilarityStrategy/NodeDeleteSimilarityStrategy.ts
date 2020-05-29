/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 1:17 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 1:17 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { DiffNode } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { NODE_TOTAL_SCORE } from '../const';

export class NodeDeleteSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    logs.push(`missing a sub-tree of ${diffNode.location}`);
    const count = diffNode.subTree?.count() ?? 1;
    return NODE_TOTAL_SCORE * count;
  }
}
