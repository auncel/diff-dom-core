import { IRenderNode, ITreeNode } from '../../renderNode/domCore';
export declare enum RenderNodeDiffType {
    EQUALITY = 0,
    INEQUAL = 1,
    MISSING = 2,
    EXTRA = 3
}
export interface IDiffRenderNode extends ITreeNode {
    type: RenderNodeDiffType;
    actual: IRenderNode;
    expect: IRenderNode;
    visited: boolean;
    children: IDiffRenderNode[];
}
export declare function createDiffRenderNode(actual: IRenderNode, expect?: IRenderNode, type?: RenderNodeDiffType): IDiffRenderNode;
