/* --------------------------------------------------------------------------*
 * Description: gloable config store                                         *
 *                                                                           *
 * File Created: Sunday, 22nd March 2020 10:28 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 25th March 2020 9:01 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
import { IPlainObject } from '@auncel/common/types/IPlainObject';
import { TCSSProperty } from './RenderNode/css';
import { TTag, TTagAttribute } from './RenderNode/element';

export interface IGenerateRenderTreeOptions extends IPlainObject {
  ignoreElement?: TTag[];
  CSSPropertWhiteList?: TCSSProperty[]; // 如果 length == 1，那就不生效
  CSSPropertBlackList?: TCSSProperty[];
  tagWhiteList?: TTag[]; // 出题者限制使用的标签
  tagBlackList?: TTag[]; // 如果 length == 1，那就不生效
  noChildElement?: TTag[];
  displayGridGap?: number;
}

export const generateRenderTreeOptions: IGenerateRenderTreeOptions = {
  ignoreElement: [
    'script', 'style',
  ],
  CSSPropertWhiteList: [],
  // if keyword 'animation' means black all animation-* properties
  CSSPropertBlackList: [
    'transform', 'animation',
  ],
  tagBlackList: [
    'noscript', 'font', 'frameset', 'iframe', 'frame', 'canvas',
  ],
  tagWhiteList: [],
  noChildElement: [
    'img', 'canvas', 'input', 'textarea', 'audio',
    'video', 'hr', 'embed', 'object', 'progress',
  ],
  displayGridGap: 5,
};

/**
 * 1. isStrict 1.不允许有多余的属性
 * 2. list：检查指定 attr，如果 list 不存在，或者长度为0则检查所有出现的属性，否则检查指定的属性
 * @export
 * @interface IStrictlyEqualAttrOption
 */
export interface IAttrEvaluationOption {
  isStrict?: boolean;
  list?: TTagAttribute[];
}

/**
 * @type {Partial<Omit<Record<keyof CSSStyleDeclaration, boolean>, number>>} true means check properties, false means skip check
 */
export type IStyleEvaluationOption = Partial<Omit<Record<keyof CSSStyleDeclaration, boolean>, number>>;

/**
 *
 */
export interface IStrictlyEqualOption {
  attrs?: IAttrEvaluationOption;
  isTagStrictlyEqaul?: boolean;
  isIdStrictlyEqual?: boolean;
  isClassStrictlyEqual?: boolean;
  style: IStyleEvaluationOption;
  rectTolerance: number;
}

export const strictlyEqualOption: IStrictlyEqualOption = {
  attrs: {
    isStrict: true,
    list: [],
  },
  // isTagStrictlyEqaul: true,
  isIdStrictlyEqual: false,
  isClassStrictlyEqual: true,
  style: {
    display: true,
    boxSizing: true,
    color: true,
    backgroundColor: true,
    zIndex: false,
  },
  rectTolerance: 0,
};

export interface IGenerateDiffTreeOption {
  rectTolerance?: number;
}

export const generateDiffTreeOption: IGenerateDiffTreeOption = {
  rectTolerance: 0,
};
export interface IFixedScoringPointEvaluationOption {
  attrs?: IAttrEvaluationOption;
  isTagStrictlyEqaul?: boolean;
  isIdStrictlyEqual?: boolean;
  isClassStrictlyEqual?: boolean;
  style?: IStyleEvaluationOption;
  rectTolerance?: number;
}

export const fixedScoringPointEvaluation: IFixedScoringPointEvaluationOption = {
  attrs: {
    isStrict: true,
    list: [],
  },
  // isTagStrictlyEqaul: true,
  isIdStrictlyEqual: true,
  isClassStrictlyEqual: true,
  style: {
    display: true,
    boxSizing: true,
    color: true,
    backgroundColor: true,
    zIndex: false,
  },
  rectTolerance: 0,
};

export interface IDomDiffCoreOption extends IPlainObject{
  generation: IGenerateRenderTreeOptions;
  diff: IGenerateDiffTreeOption;
  evaluation: IFixedScoringPointEvaluationOption;
}
