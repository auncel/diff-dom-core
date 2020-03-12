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
} from '../RenderNode/domCore';

function getNodeLocation(node: IDiffNode | undefined): string {
  const buff = [];

  while (node) {
    buff.unshift(node.location);
    node = node.parent;
  }
  return buff.join(' ');
}

const NODE_TOTAL_SCORE = 100;
const ID_SCORE = 5;
const TAGNAME_SCORE = 5;
const CLASS_SCORE = 5;
const ATTR_SCORE = 5;
const RECT_SCORE = 20;
const STYLE_SCORE = 60;

const CSSPropertyValueInequalScore = -5;
const CSSPropertyValueMissingScore = -10;
const CSSPropertyValueExtragScore = 0;

function evaluateStyleSimlarity(
  styleDistinction: IDistinctionDetail<TCSSPropertyValueType>[], logs: string[],
): number {
  if (!styleDistinction || !styleDistinction.length) return STYLE_SCORE;

  let equalityCount = 0;
  let inequalCount = 0;
  let missingCount = 0;
  let extraCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of styleDistinction) {
    // eslint-disable-next-line default-case
    switch (distinction.type) {
      case DistinctionType.EQUALITY:
        equalityCount++;
        break;
      case DistinctionType.INEQUAL:
        logs.push(
          `property incorrent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`,
        );
        inequalCount++;
        break;
      case DistinctionType.MISSING:
        logs.push(`missing property: ${distinction.key}`);
        missingCount++;
        break;
      case DistinctionType.EXTRA:
        logs.push(`extra property: ${distinction.key}`);
        extraCount++;
        break;
    }
  }

  const propertyScore = STYLE_SCORE / (equalityCount + inequalCount + (missingCount * 2));
  const score = propertyScore * (missingCount + inequalCount + extraCount);
  return score;
}

function evaluateAttrSimlarity(
  attrDistinction: IDistinctionDetail<TAttrPropertyType>[], logs: string[],
): number {
  if (!attrDistinction || !attrDistinction.length) return ATTR_SCORE;

  let equalityCount = 0;
  let inequalCount = 0;
  let missingCount = 0;
  // let extraCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of attrDistinction) {
    // eslint-disable-next-line default-case
    switch (distinction.type) {
      case DistinctionType.EQUALITY:
        equalityCount++;
        break;
      case DistinctionType.INEQUAL:
        inequalCount++;
        logs.push(`attribute incorent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`);
        break;
      case DistinctionType.MISSING:
        missingCount++;
        logs.push(`missing attribute: ${distinction.key}`);
        break;
      // case DistinctionType.EXTRA:
      //   extraCount++;
      //   break;
    }
  }

  const attrCount = equalityCount + inequalCount + missingCount;
  const attrScore = ATTR_SCORE - ((ATTR_SCORE / attrCount) * (inequalCount + missingCount));
  return attrScore;
}

function evaluateRectSimlarity(
  rectDistinctions: IDistinctionDetail<number>[], logs: string[],
): number {
  let rectScore = 0;

  if (!rectDistinctions || !rectDistinctions.length) return rectScore;

  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of rectDistinctions) {
    const distance = Math.abs(distinction.actual! - distinction.expect!);
    // shouldn't greater then (RECT_SCORE / 4)
    rectScore += distance * Math.log2(distance + 1);

    switch (distinction.key) {
      case 'height':
      case 'width':
        logs.push(
          `incrorent ${distinction.key}. expect ${distinction.expect}px, but actual ${distinction.actual}px `,
        );
        break;
      case 'top':
      case 'left':
        logs.push(
          `relative position incrorent. ${distinction.key} expect ${distinction.expect}px, not ${distinction.actual}px`,
        );
        break;
      default:
    }
  }
  return Math.min(rectScore, RECT_SCORE);
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
export function generateDiffResult(root: IDiffNode): IFixedScoringPointResult {
  const diffLog: IDiffLog[] = [];
  const stack: IDiffNode[] = [];
  stack.push(root);
  let totalScore = 0;
  let nodeCount = 0;
  // 非递归遍历
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      nodeCount++;
      const nodeDiffLogs: string[] = [];
      let nodeScore = NODE_TOTAL_SCORE;
      // diff type is rect
      if (node.type & DiffType.Id) {
        nodeScore -= ID_SCORE;
        nodeDiffLogs.push(
          `incorent id. expect ${node.id?.expect}, actual ${node.id?.actual}`,
        );
      }

      if (node.type & DiffType.ClassName) {
        nodeScore -= CLASS_SCORE;
        nodeDiffLogs.push(
          `incorent class. expect ${node.className?.expect}, actual ${node.className?.actual}`,
        );
      }

      if (node.type & DiffType.Rect) {
        const rectLosedScore = evaluateRectSimlarity(node.rect ?? [], nodeDiffLogs);
        nodeScore -= rectLosedScore;
      }

      if (node.type & DiffType.Style) {
        const styleLosedScore = evaluateStyleSimlarity(node.style ?? [], nodeDiffLogs);
        nodeScore -= styleLosedScore;
      }

      if (node.type & DiffType.Attr) {
        const attrLosedScore = evaluateAttrSimlarity(node.attr ?? [], nodeDiffLogs);
        nodeScore -= attrLosedScore;
      }

      const logMsg: IDiffLog = {
        location: getNodeLocation(node),
        difference: nodeDiffLogs,
      };

      if (logMsg.difference.length > 0) {
        diffLog.push(logMsg);
      }
      totalScore += nodeScore;
      // push children to stack
      if (node.children) {
        node.children.forEach((child) => {
          child.parent = node;
          stack.push(child);
        });
      }
    }
  }
  const score = Number(((totalScore / (nodeCount * 100)) * 100).toFixed(2));
  return {
    score,
    logs: diffLog,
  };
}
