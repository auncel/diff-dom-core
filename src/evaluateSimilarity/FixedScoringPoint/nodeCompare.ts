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
import debug from 'debug';
import { INodeCompare } from 'evaluateSimilarity/nodeCompare.interface';
import { getNodeLocation } from './fixedScoringPoint';
import { IDiffLog } from '../DiffLog.interface';
import { NODE_TOTAL_SCORE } from './const';
import { SimilarityStrategyContext } from './SimilarityStrategy/indext';

const log = debug('auncel:diff:nodeCompare');

export const fixedScoringPointNodeCompare: INodeCompare = (diffNode, diffLogs) => {
  const nodeDiffLogs: string[] = [];
  let nodeScore = NODE_TOTAL_SCORE;
  const nodeCount = diffNode.subTree?.count() ?? 1;

  const strategyContext = new SimilarityStrategyContext();
  // eslint-disable-next-line no-restricted-syntax
  for (const [diffType, strategy] of strategyContext.iterator()) {
    if (diffNode.diffType & diffType) {
      nodeScore -= strategy.evaluate(diffNode, nodeDiffLogs);
      log('diffType %s nodeScore %s', diffType, nodeScore);
    }
  }

  const logMsg: IDiffLog = {
    location: getNodeLocation(diffNode),
    difference: nodeDiffLogs,
  };

  if (nodeDiffLogs.length > 0) {
    diffLogs.push(logMsg);
  }

  return {
    nodeScore,
    nodeCount,
  };
};
