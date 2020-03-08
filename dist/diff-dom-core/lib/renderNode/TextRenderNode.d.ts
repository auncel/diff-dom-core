import { NodeType } from './domCore';
import TreeNode, { TTreeNodeCallback } from './TreeNode';
export default class TextRenderNode extends TreeNode {
    text: string;
    tagName: string;
    nodeType: NodeType.TEXT_NODE;
    constructor(text?: string);
    hasChildren(): boolean;
    forEach(callback: TTreeNodeCallback): void;
    append(child: TextRenderNode): void;
}
