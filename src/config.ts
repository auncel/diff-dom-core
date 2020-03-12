/* eslint-disable no-param-reassign */
import { TCSSProperty } from './RenderNode/css';
import { TTag, TTagAttribute } from './RenderNode/element';

export interface IGenerateRenderTreeOptions {
  ignoreElement?: TTag[];
  CSSPropertWhiteList?: TCSSProperty[]; // 如果 length == 1，那就不生效
  CSSPropertBlackList?: TCSSProperty[];
  tagWhiteList?: TTag[]; // 出题者限制使用的标签
  tagBlackList?: TTag[]; // 如果 length == 1，那就不生效
  noChildElement?: TTag[];
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
};

export function mergeWithDefaultConfig(
  config: IGenerateRenderTreeOptions,
): IGenerateRenderTreeOptions {
  type IGenerateRenderTreeOptionsKeys = keyof IGenerateRenderTreeOptions;
  Object.keys(generateRenderTreeOptions).forEach((key) => {
    const option = key as IGenerateRenderTreeOptionsKeys;
    if (typeof config[option] !== 'undefined') {
      if (Array.isArray(generateRenderTreeOptions[option])) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        config[option] = [...generateRenderTreeOptions[option], ...config[option]];
      } else {
        throw new TypeError(`generateRenderTreeOptions[${option}] should Be Array`);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      config[option] = generateRenderTreeOptions[option];
    }
  });
  return config;
}

/**
 * 1. isStrictlyEqual ture: 严格相等，false:允许 AT 冗余， 默认：true
 * 2. list：检查指定 attr，如果 list 存在，则 isStrictlyEqual 失效
 *
 * @export
 * @interface IStrictlyEqualAttrOption
 */
export interface IStrictlyEqualAttrOption {
  isStrictlyEqual?: boolean;
  list?: TTagAttribute[];
}

export interface IStrictlyEqualStyleOption {
  // false表示不严格，true表示和 QT 一致
  display?: boolean;
  boxSizing?: boolean;
  color?: boolean;
  backgroundColor?: boolean;
  // true z-index 的数值一致即可，false 表示前后顺序相同即可
  zIndex?: boolean;
}

export interface IStrictlyEqualOption {
  attrs?: IStrictlyEqualAttrOption;
  isTagStrictlyEqaul?: boolean;
  isIdStrictlyEqual?: boolean;
  isClassStrictlyEqual?: boolean;
  style: IStrictlyEqualStyleOption;
  rectTolerance: number;
}

export const strictlyEqualOption: IStrictlyEqualOption = {
  attrs: {
    isStrictlyEqual: true,
  },
  isTagStrictlyEqaul: true,
  isIdStrictlyEqual: true,
  isClassStrictlyEqual: true,
  style: {
    display: true,
    boxSizing: true,
    color: true,
    backgroundColor: true,
    zIndex: true,
  },
  rectTolerance: 0,
};
