import { TTag, TAttributes } from './element';
import { TStyleProps } from './css';
export interface IDiffParam {
    stylesheet?: string;
    fragment: string;
}
export declare const STRICT_MODE = 0;
export declare const LOOSE_MODE = 1;
export declare type TDiffMode = typeof STRICT_MODE | typeof LOOSE_MODE;
export interface IDiffOption {
    mode: TDiffMode;
}
export declare enum NodeType {
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    TEXT_NODE = 3,
    CDATA_SECTION_NODE = 4,
    ENTITY_REFERENCE_NODE = 5,
    PROCESSING_INSTRUCTION_NODE = 6,
    ENTITY_NODE = 7,
    COMMENT_NODE = 8,
    DOCUMENT_NODE = 9,
    DOCUMENT_TYPE_NODE = 10,
    DOCUMENT_FRAGMENT_NODE = 11,
    NOTATION_NODE = 12
}
export declare type TNodeRect = {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
};
export interface ITreeNode {
    children: ITreeNode[];
    hasChildren(): boolean;
    forEach?(callback: (node: ITreeNode, index?: number, thisArg?: ITreeNode) => void): void;
}
export interface IRenderNode extends ITreeNode {
    attr?: TAttributes;
    id?: string;
    uuid?: string;
    className?: string;
    tagName?: TTag;
    nodeName?: string;
    nodeType: NodeType.ELEMENT_NODE | NodeType.TEXT_NODE;
    rect?: TNodeRect;
    dataset?: DOMStringMap;
    style?: TStyleProps;
    children: IRenderNode[];
    text?: string;
    xHash?: string;
    parent?: IRenderNode;
    nodeDiffType?: DiffType;
}
export declare type TRenderTree = IRenderNode;
export declare type ValuesOf<T extends any[]> = T[number];
export declare enum DiffType {
    None = 0,
    NodeType = 1,
    Tag = 2,
    Id = 4,
    ClassName = 8,
    Attr = 16,
    DataSet = 32,
    Style = 64,
    Rect = 128,
    Text = 256,
    NodeUPDATE = 512,
    NodeINSERT = 1024,
    NodeDELETE = 2048
}
export declare enum DistinctionType {
    MISSING = 0,
    EXTRA = 1,
    INEQUAL = 2,
    EQUALITY = 3
}
export interface IDistinctionDetail<T> {
    key: string;
    type: DistinctionType;
    expect?: T;
    actual?: T;
}
export declare type TAttrPropertyType = boolean | string;
export declare type TCSSPropertyValueType = string | number;
export interface IDiffNode extends ITreeNode {
    type: number;
    location: string;
    tagName?: IDistinctionDetail<string>;
    nodeType?: IDistinctionDetail<NodeType>;
    id?: IDistinctionDetail<string>;
    className?: IDistinctionDetail<string>;
    style?: IDistinctionDetail<TCSSPropertyValueType>[];
    attr?: IDistinctionDetail<TAttrPropertyType>[];
    rect?: IDistinctionDetail<number>[];
    dataset?: IDistinctionDetail<DOMStringMap>;
    children: IDiffNode[];
    parent?: IDiffNode;
    text?: IDistinctionDetail<string>;
}
export interface IDiffLog {
    location: string;
    difference: string[];
}
