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
import {
  IDiffNode,
  IDiffLog,
  DiffType,
  DistinctionType,
  TNodeRect,
  IDistinctionDetail,
  TCSSPropertyValueType,
  TAttrPropertyType,
} from '../../RenderNode/domCore';
import ShadowRenderNode from '../../DiffTree/ShadowRenderNode';
import { fixedScoringPointNodeCompare } from './nodeCompare';
import { DiffNode } from '../../DiffTree/DiffNode';

export function getNodeLocation(node: ShadowRenderNode | undefined): string {
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
export function generateDiffResult(root: DiffNode): IFixedScoringPointResult {
  const diffLog: IDiffLog[] = [];
  const stack: DiffNode[] = [];
  stack.push(root);
  let totalScore = 0;
  let nodeCount = 0;
  // 非递归遍历
  while (stack.length) {
    const node = stack.pop()!;
    if (node) {
      nodeCount++;
    }
    totalScore += fixedScoringPointNodeCompare(node, diffLog);
  }
  const score = Number(((totalScore / (nodeCount * 100)) * 100).toFixed(2));
  return {
    score,
    logs: diffLog,
  };
}
