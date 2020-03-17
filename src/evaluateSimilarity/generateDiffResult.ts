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

import { IGenerateDiffResult, IDiffResult } from "./generateDiffResult.interface";
import { fixedScoringPointNodeCompare } from './FixedScoringPoint/nodeCompare'
import { IDiffLog } from "./DiffLog.interface";
import { DiffNode } from "../DiffTree/DiffNode";

const noop = function(...args: any): any {}


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
  beforTraverse()
  // 非递归遍历
  while (stack.length) {
    const node = stack.pop()!;

    const { nodeCount, nodeScore } = nodeCompareFn(node, diffLog);
    totalNodeCount += nodeCount;
    totalScore += nodeScore;
    node.children.forEach(child => {
      stack.push(child)
    });
  }

  return afterTraverse(totalScore, totalNodeCount, diffLog);
  // const score = Number(((totalScore / (totalNodeCount * 100)) * 100).toFixed(2));
  // return {
  //   score,
  //   logs: diffLog,
  // };
}


/**
 * 只是位置信息的比较
 * TODO: 考虑文本节点
 * @export
 * @param {IDiffNode} root
 */
