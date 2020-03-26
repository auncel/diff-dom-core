/* eslint-disable import/no-unresolved */
/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 13th March 2020 4:29 pm                             *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 13th March 2020 4:29 pm                            *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-bitwise */
import TreeNode from '../RenderNode/TreeNode';
import { NodeType } from '../RenderNode/enum';
import { getNodeLocal } from './utils';
import {
  TagNameDistinctionStrategy, IdDistinctionStrategy, ClassNameDistinctionStrategy,
  DisplayRateDistinctionStrategy, AttrDistinctionStrategy, StyleDistinctionStrategy,
  isStyleEqual, RectDistinctionStrategy, TextDistinctionStrategy,
} from './simple-distinction';
import { UnionRenderNode } from '../RenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';
import ElementRenderNode from '../RenderNode/ElementRenderNode';


export enum DiffType {
  None = 0,
  // eslint-disable-next-line no-shadow
  NodeType = 1 << 0,
  Tag = 1 << 1, // element 和 text， element tag 不同
  Id = 1 << 2,
  ClassName = 1 << 3,
  Attr = 1 << 4,
  DataSet = 1 << 5,
  Style = 1 << 6,
  Rect = 1 << 7,
  Text = 1 << 8, // 文本不相同
  // 节点差异
  NodeUpdate = 1 << 9,
  NodeInsert = 1 << 10,
  NodeDelete = 1 << 11,
  NodeMove = 1 << 12,
}

export enum DistinctionType {
  MISSING,
  EXTRA,
  INEQUAL,
  EQUALITY,
}

export interface IDistinctionDetail<T> {
  key: string;
  type: DistinctionType;
  expect?: T;
  actual?: T;
}

/** Attribute 的值只有 boolean(checked) 和 string(type) */
export type TAttrPropertyType = boolean | string;

/** CSS 属性值的类型 */
export type TCSSPropertyValueType = string | number;

export class DiffNode extends TreeNode {
  diffType: number = DiffType.None; // 差异类型，是 DiffType 的累加值
  location = ''; // 为了方便日志输出
  moveDistance = 0; // 节点移动距离
  index = -1;

  tagName?: IDistinctionDetail<string>;
  nodeType?: IDistinctionDetail<NodeType>;

  id?: IDistinctionDetail<string>;
  className?: IDistinctionDetail<string>;

  style?: IDistinctionDetail<TCSSPropertyValueType>[];
  attr?: IDistinctionDetail<TAttrPropertyType>[];
  rect?: IDistinctionDetail<number>[];
  dataset?: IDistinctionDetail<DOMStringMap>;

  children: DiffNode[] = [];
  parent: DiffNode | null = null; // 生成 diff 结果时，用于获取生成节点路径

  text?: IDistinctionDetail<string>;

  displayRate?: IDistinctionDetail<number>;

  subTree?: UnionRenderNode;
  // config: IStrictlyEqualOption;
  // constructor() {
  //   super();

  //   this.config = getConfig('diff') as IStrictlyEqualOption;
  // }

  static createDiffNode(newNode: UnionRenderNode, oldNode: UnionRenderNode): DiffNode {
    // TODO: newNode is ELEMENT_NODE and oldNode is TEXT_NODE
    if (newNode.nodeType === NodeType.ELEMENT_NODE && oldNode.nodeType === NodeType.ELEMENT_NODE) {
      return DiffNode.createElementDiffNode(newNode, oldNode);
    } else if (newNode.nodeType === NodeType.TEXT_NODE && oldNode.nodeType === NodeType.TEXT_NODE) {
      return DiffNode.createTextDiffNode(newNode, oldNode);
    } // TODO: handle default case
    return new DiffNode();
  }

  private static createElementDiffNode(
    newNode: ElementRenderNode,
    oldNode: ElementRenderNode,
  ): DiffNode {
    const diffNode = new DiffNode();

    diffNode.location = getNodeLocal(newNode);

    diffNode.tagName = new TagNameDistinctionStrategy().distinguish(newNode, oldNode)[0];
    if (diffNode.tagName?.type !== DistinctionType.EQUALITY) {
      diffNode.diffType |= DiffType.Tag;
    }


    diffNode.id = new IdDistinctionStrategy().distinguish(newNode, oldNode)[0];
    if (diffNode.id?.type !== DistinctionType.EQUALITY) {
      diffNode.diffType |= DiffType.Id;
    }

    diffNode.className = new ClassNameDistinctionStrategy().distinguish(newNode, oldNode)[0];
    if (diffNode.className?.type !== DistinctionType.EQUALITY) {
      diffNode.diffType |= DiffType.ClassName;
    }

    diffNode.displayRate = new DisplayRateDistinctionStrategy().distinguish(newNode, oldNode)[0];

    // eslint-disable-next-line no-undef
    const attrDisctinctions = new AttrDistinctionStrategy().distinguish(newNode, oldNode);
    if (attrDisctinctions.length !== 0) {
      diffNode.diffType |= DiffType.Attr;
      diffNode.attr = attrDisctinctions;
    }

    const styleDistinctions = new StyleDistinctionStrategy().distinguish(newNode, oldNode);

    if (!isStyleEqual(newNode, oldNode)) {
      diffNode.diffType |= DiffType.Style;
      diffNode.style = styleDistinctions;
    }

    const rectDistinction = new RectDistinctionStrategy().distinguish(newNode, oldNode);
    if (rectDistinction.length) {
      diffNode.rect = rectDistinction;
    }

    return diffNode;
  }

  private static createTextDiffNode(newNode: TextRenderNode, oldNode: TextRenderNode): DiffNode {
    const diffNode = new DiffNode();
    diffNode.text = new TextDistinctionStrategy().distinguish(newNode, oldNode)[0];
    return diffNode;
  }
}
