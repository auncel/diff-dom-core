import { NodeType, TNodeRect, DiffType } from './domCore';
import { TAttributes, TTag } from './element';
import { TStyleProps } from './css';
import TreeNode from './TreeNode';
export default class ElementRenderNode extends TreeNode {
    attr: TAttributes;
    id?: string;
    uuid?: string;
    className?: string;
    tagName?: TTag;
    nodeName?: string;
    nodeType: NodeType.ELEMENT_NODE;
    rect: TNodeRect;
    dataset?: DOMStringMap;
    style: TStyleProps;
    children: Set<ElementRenderNode>;
    text?: string;
    nodeDiffType?: DiffType;
    constructor(tagName?: TTag);
}
