/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 1:21 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 1:21 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import debug from 'debug';
import { DiffNode } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { NODE_TOTAL_SCORE } from '../const';

const log = debug('auncel:diff:NodeInsertSimilarityStrategy');

export class NodeInsertSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    logs.push(`having a extra sub-tree of ${diffNode.location}`);
    const count = diffNode.subTree?.count() ?? 1;
    log('subTree count %d', count);
    return NODE_TOTAL_SCORE * count;
  }
}
