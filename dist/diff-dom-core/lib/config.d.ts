import { TCSSProperty } from '@surpass/common/types/css';
import { TTag, TTagAttribute } from '@surpass/common/types/element';
export interface IGenerateRenderTreeOptions {
    ignoreElement?: TTag[];
    CSSPropertWhiteList?: TCSSProperty[];
    CSSPropertBlackList?: TCSSProperty[];
    tagWhiteList?: TTag[];
    tagBlackList?: TTag[];
    noChildElement?: TTag[];
}
export declare const generateRenderTreeOptions: IGenerateRenderTreeOptions;
export declare function mergeWithDefaultConfig(config: IGenerateRenderTreeOptions): IGenerateRenderTreeOptions;
export interface IStrictlyEqualAttrOption {
    isStrictlyEqual?: boolean;
    list?: TTagAttribute[];
}
export interface IStrictlyEqualStyleOption {
    display?: boolean;
    boxSizing?: boolean;
    color?: boolean;
    backgroundColor?: boolean;
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
export declare const strictlyEqualOption: IStrictlyEqualOption;
