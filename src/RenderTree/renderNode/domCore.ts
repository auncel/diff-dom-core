import { TTag, TAttributes } from './element';
import { TStyleProps } from './css';

export interface IDiffParam {
  stylesheet?: string;
  fragment: string;
}

export const STRICT_MODE = 0;

export const LOOSE_MODE = 1;

export type TDiffMode = typeof STRICT_MODE | typeof LOOSE_MODE;

export interface IDiffOption {
  mode: TDiffMode;
}

export enum NodeType {
  ELEMENT_NODE = 1, // 一个 元素 节点，例如 <p> 和 <div>。
  /** @deprecated  */
  ATTRIBUTE_NODE, // 元素的耦合属性 。在 DOM4 规范里Node 接口将不再实现这个元素属性。
  TEXT_NODE, // Element 或者 Attr 中实际的  文字
  /** @deprecated  */
  CDATA_SECTION_NODE, // 一个 CDATASection，例如 <!CDATA[[ … ]]>。
  /** @deprecated  */
  ENTITY_REFERENCE_NODE, // 一个 XML 实体引用节点。 在 DOM4 规范里被移除。
  PROCESSING_INSTRUCTION_NODE, // 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明。
  /** @deprecated  */
  ENTITY_NODE, // 一个 XML <!ENTITY ...>  节点。 在 DOM4 规范中被移除。
  COMMENT_NODE, // 一个 Comment 节点。
  DOCUMENT_NODE, // 一个 Document 节点。
  DOCUMENT_TYPE_NODE, // 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的。
  DOCUMENT_FRAGMENT_NODE, // 一个 DocumentFragment 节点
  /** @deprecated  */
  NOTATION_NODE, // 一个 XML <!NOTATION ...> 节点。 在 DOM4 规范里被移除.
}


export type TNodeRect = {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export interface ITreeNode {
  children: ITreeNode[];
  hasChildren(): boolean;
  forEach?(callback: (node: ITreeNode, index?: number, thisArg?: ITreeNode) => void): void;
}

export interface IRenderNode extends ITreeNode {
  /**
   * TODO: 完善 attribute
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
   */
  attr?: TAttributes;

  id?: string;
  uuid?: string; // 如果元素被设置了样式，就会有这个属性
  className?: string;
  tagName?: TTag;
  nodeName?: string;
  nodeType: NodeType.ELEMENT_NODE | NodeType.TEXT_NODE;

  rect?: TNodeRect;

  dataset?: DOMStringMap;

  style?: TStyleProps;

  children: IRenderNode[];
  text?: string; // for TEXT_NODE

  xHash?: string; // 专门给 x-diff 算法
  parent?: IRenderNode; // x-diff 需要
  nodeDiffType?: DiffType;
}

export type TRenderTree = IRenderNode;

export type ValuesOf<T extends any[]>= T[number];

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
  NodeUPDATE = 1 << 9,
  NodeINSERT = 1 << 10,
  NodeDELETE = 1 << 11,
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
export interface IDiffNode extends ITreeNode {
  type: number; // 差异类型，是 DiffType 的累加值
  location: string; // 为了方便日志输出

  tagName?: IDistinctionDetail<string>;
  nodeType?: IDistinctionDetail<NodeType>;

  id?: IDistinctionDetail<string>;
  className?: IDistinctionDetail<string>;

  style?: IDistinctionDetail<TCSSPropertyValueType>[];
  attr?: IDistinctionDetail<TAttrPropertyType>[];
  rect?: IDistinctionDetail<number>[];
  dataset?: IDistinctionDetail<DOMStringMap>;

  children: IDiffNode[];
  parent?: IDiffNode; // 生成 diff 结果时，用于获取生成节点路径

  text?: IDistinctionDetail<string>;
}

export interface IDiffLog {
  location: string;
  difference: string[];
}
