/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 1:25 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 1:25 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import debug from 'debug';
import { DiffNode } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { NODE_TOTAL_SCORE } from '../const';

const log = debug('auncel:diff:NodeMoveSimilarityStrategy');

export class NodeMoveSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    logs.push(`node position change ${diffNode.location}`);
    log('node move distance %d', diffNode.moveDistance);
    return NODE_TOTAL_SCORE * (diffNode.moveDistance / 2);
  }
}
