/* eslint-disable no-unused-vars */
/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 4:00 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 4:00 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IGenerateDiffResult, IDiffResult } from './generateDiffResult.interface';
import { IDiffLog } from './DiffLog.interface';
import { DiffNode } from '../DiffTree/DiffNode';
import { getConfig } from '../utils';
import { IFixedScoringPointEvaluationOption } from '../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-empty-function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function (...args: any): any {};


/**
 * 通用 diff 结果生成函数
 * @export
 * @param {DiffNode} root
 * @param {IGenerateDiffResultOption}} options
 */
export const generateDiffResult: IGenerateDiffResult = (root, {
  beforTraverse = noop,
  nodeCompareFn,
  afterTraverse,
}): IDiffResult => {
  const diffLog: IDiffLog[] = [];
  const stack: DiffNode[] = [];
  stack.push(root);
  let totalScore = 0;
  let totalNodeCount = 0;
  beforTraverse();
  // 非递归遍历
  while (stack.length) {
    const node = stack.pop()!;

    const { nodeCount, nodeScore } = nodeCompareFn(node, diffLog);
    totalNodeCount += nodeCount;
    totalScore += nodeScore;
    node.children.forEach((child) => {
      stack.push(child);
    });
  }

  return afterTraverse(totalScore, totalNodeCount, diffLog);
};
