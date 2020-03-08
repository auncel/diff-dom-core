/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 10:28 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 26th November 2019 10:28 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { isEqual } from 'lodash';
import { TStyleProps } from '../renderNode/css';
import { IDistinctionDetail, DistinctionType,
  NodeType, TAttrPropertyType, TCSSPropertyValueType, TNodeRect,
  IRenderNode, IDiffNode, DiffType,
} from '../renderNode/domCore';
import {
  IStrictlyEqualAttrOption, IStrictlyEqualOption, IStrictlyEqualStyleOption,
} from '../config';


export function createDistinction<T>(
  key: string, type: DistinctionType, expect?: T, actual?: T,
): IDistinctionDetail<T> {
  return {
    key,
    type,
    expect,
    actual,
  };
}

export type Comparator = <T>(
  object: object, comparison: object, keys: string[],
) => IDistinctionDetail<T>[];

/**
 * 比较两个对象的指定的 keys 的属性是否相同
 * @param object 被比较物
 * @param comparison 比较物
 * @param keys 比较的 key
 * @param isEualFn 是否相等的比较函数
 */
export function distinctionCompare<T>(
  object: object, comparison: object, keys: string[], isEqualFn = isEqual,
): IDistinctionDetail<T>[] {
  const res: IDistinctionDetail<T>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const isObjectKeyExist = typeof object[key] !== 'undefined';
    const isComparisonKeyExist = typeof comparison[key] !== 'undefined';
    if (isObjectKeyExist && isComparisonKeyExist) {
      if (isEqualFn(object[key], comparison[key])) { // 浅比较
        res.push(
          createDistinction<T>(
            key,
            DistinctionType.EQUALITY,
            object[key],
            null,
          ),
        );
      } else {
        res.push(
          createDistinction<T>(
            key,
            DistinctionType.INEQUAL,
            object[key],
            comparison[key],
          ),
        );
      }// else 相等
    } else if (isObjectKeyExist && !isComparisonKeyExist) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.MISSING,
          object[key],
        ),
      );
    } else if (!isObjectKeyExist && isComparisonKeyExist) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.MISSING,
          null,
          comparison[key],
        ),
      );
    } // !isObjectKeyExist && !isComparisonKeyExist
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(comparison)) {
    if (!keys.includes(key)) {
      res.push(
        createDistinction<T>(
          key,
          DistinctionType.EXTRA,
          null,
          comparison[key],
        ),
      );
    }
  }

  return res;
}

export function isElementType(element: IRenderNode): boolean {
  return element.nodeType === NodeType.ELEMENT_NODE;
}

function identifyAttrDistinction(
  leftNode: IRenderNode, rightNode: IRenderNode, attrConfig: IStrictlyEqualAttrOption,
): IDistinctionDetail<TAttrPropertyType>[] {
  if (Array.isArray(attrConfig.list)) {
    return distinctionCompare<TAttrPropertyType>(leftNode.attr, rightNode.attr, attrConfig.list);
  }

  const distinctions: IDistinctionDetail<TAttrPropertyType>[] = distinctionCompare<TAttrPropertyType>(
    leftNode.attr, rightNode.attr, Object.keys(leftNode.attr),
  );

  if (attrConfig.isStrictlyEqual) {
    return distinctions;
  }

  return distinctions.filter(distinction => distinction.type === DistinctionType.EXTRA);
}

/** TODO: styleConfig */
export function identifyStyleDistinction(
  leftNodeStyle: TStyleProps, rightNodeStyle: TStyleProps, styleConfig: IStrictlyEqualStyleOption,
): IDistinctionDetail<TCSSPropertyValueType>[] {
  const keys = Object.keys(leftNodeStyle);
  const distinctions = distinctionCompare<TCSSPropertyValueType>(
    leftNodeStyle, rightNodeStyle, keys,
  );
  return distinctions;
}

export function identifyRectDistinction(
  leftRect: TNodeRect, rightRect: TNodeRect, rectTolerance: number,
): IDistinctionDetail<number>[] {
  const distinctions = distinctionCompare<number>(
    leftRect, rightRect, ['left', 'top', 'width', 'height'],
    (leftValue, rightValue) => Math.abs(leftValue - rightValue) <= rectTolerance,
  );

  return distinctions;
}

export function isStyleEqual(node1: IRenderNode, node2: IRenderNode): boolean {
  return isEqual(node1.style, node2.style);
}

export function getNodeLocal(node: IRenderNode): string {
  const buff = [node.tagName.toLowerCase()];
  if (node.id) buff.push(`#${node.id}`);
  if (node.className) buff.push('.', node.className.split(' ').join('.'));
  return buff.join('');
}

export function createDiffNode(): IDiffNode {
  return {
    type: DiffType.None,
    location: '',
  };
}

export function getDiffNode(
  left: IRenderNode,
  right: IRenderNode,
  config: IStrictlyEqualOption,
): IDiffNode {
  const diffNode = createDiffNode();

  diffNode.location = getNodeLocal(right);

  if (config.isTagStrictlyEqaul) {
    if (left.nodeName !== right.nodeName) {
      diffNode.type |= DiffType.Tag;
      diffNode.tagName = createDistinction<string>(
        'tagName',
        DistinctionType.INEQUAL,
        left.nodeName,
        right.nodeName,
      );
    }
  }

  if (config.isIdStrictlyEqual) {
    if (left.id && right.id && left.id !== right.id) {
      diffNode.type |= DiffType.Id;
      diffNode.id = createDistinction<string>(
        'id',
        DistinctionType.INEQUAL,
        right.id,
        left.id,
      );
    }
  }

  if (config.isClassStrictlyEqual) {
    if (left.className !== right.className) {
      diffNode.type |= DiffType.ClassName;
      diffNode.className = createDistinction<string>(
        'className',
        DistinctionType.INEQUAL,
        left.className,
        right.className,
      );
    }
  }

  const attrDisctinctions = identifyAttrDistinction(left, right, config.attrs);
  if (attrDisctinctions.length !== 0) {
    diffNode.type |= DiffType.Attr;
    diffNode.attr = attrDisctinctions;
  }

  const styleDistinctions = identifyStyleDistinction(left.style, right.style, config.style);
  if (!isStyleEqual(left, right)) {
    diffNode.type |= DiffType.Style;
    diffNode.style = styleDistinctions;
  }

  const rectDistinction = identifyRectDistinction(left.rect, right.rect, config.rectTolerance);
  if (rectDistinction.length) {
    diffNode.rect = rectDistinction;
  }

  return diffNode;
}
