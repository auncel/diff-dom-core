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

import { INodeCompare } from 'evaluateSimilarity/nodeCompare.interface';
import { getNodeLocation } from './fixedScoringPoint';
import { IDiffLog } from '../DiffLog.interface';
import { DiffType } from '../../DiffTree/DiffNode';
import { NODE_TOTAL_SCORE } from './const';
import { IdSimilarigyStrategy } from './SimilarityStrategy/IdSimilarityStrategy';
import { ClassNameSimilarityStrategy } from './SimilarityStrategy/ClassNameSimilarityStrategy';
import { RectSimilarityStrategy } from './SimilarityStrategy/RectSimilarityStrategy';
import { StyleSimilarityStrategy } from './SimilarityStrategy/StyleSimilarityStrategy';
import { AttrSimilarityStrategy } from './SimilarityStrategy/AttrSimilarityStrategy';

export const fixedScoringPointNodeCompare: INodeCompare = (diffNode, diffLogs) => {
  const nodeDiffLogs: string[] = [];
  let nodeScore = NODE_TOTAL_SCORE;
  let nodeCount = 1;

  // diff type is rect
  if (diffNode.diffType & DiffType.Id) {
    nodeScore -= new IdSimilarigyStrategy().evaluate([diffNode.id!], nodeDiffLogs);
  }

  if (diffNode.diffType & DiffType.ClassName) {
    nodeScore -= new ClassNameSimilarityStrategy().evaluate([diffNode.className!], nodeDiffLogs);
  }

  if (diffNode.diffType & DiffType.Rect) {
    const rectLosedScore = new RectSimilarityStrategy().evaluate(diffNode.rect!, nodeDiffLogs);
    nodeScore -= rectLosedScore;
  }

  if (diffNode.diffType & DiffType.Style) {
    const styleLosedScore = new StyleSimilarityStrategy().evaluate(diffNode.style!, nodeDiffLogs);
    nodeScore -= styleLosedScore;
  }

  if (diffNode.diffType & DiffType.Attr) {
    const attrLosedScore = new AttrSimilarityStrategy().evaluate(diffNode.attr!, nodeDiffLogs);
    nodeScore -= attrLosedScore;
  }

  if (diffNode.diffType & DiffType.NodeDelete) {
    nodeCount = diffNode.subTree?.count() ?? 1;
    nodeDiffLogs.push(`missing a sub-tree of ${diffNode.location}`);
    nodeScore = 0;
  }

  // TODO: 区分 NodeDelet 和 NodeInsert
  if (diffNode.diffType & DiffType.NodeInsert) {
    nodeCount = diffNode.subTree?.count() ?? 1;
    nodeScore = 0;
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
