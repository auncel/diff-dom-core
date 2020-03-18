/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 8th December 2019 9:35 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 9:35 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
import { fixedScoringPointNodeCompare } from './nodeCompare';
import { DiffNode } from '../../DiffTree/DiffNode';
import { generateDiffResult } from '../generateDiffResult';
import { IDiffResult } from '../generateDiffResult.interface';
import { IDiffLog } from '../DiffLog.interface';

export function getNodeLocation(node: DiffNode | null): string {
  const buff = [];

  while (node) {
    buff.unshift(node.location);
    node = node.parent;
  }
  return buff.join(' ');
}

export interface IFixedScoringPointResult {
  score: number;
  logs: IDiffLog[];
}

/**
 * 只是位置信息的比较
 * TODO: 考虑文本节点
 * @export
 * @param {IDiffNode} root
 */
export function fixedScoringPointGenerateDiffResult(root: DiffNode): IDiffResult {
  return generateDiffResult(root, {
    nodeCompareFn: fixedScoringPointNodeCompare,
    afterTraverse: (totalScore, totalNodeCount, logs) => {
      const score = Number(((totalScore / (totalNodeCount * 100)) * 100).toFixed(2));
      return {
        score,
        logs,
      };
    },
  });
}
