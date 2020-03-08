import { XTreeDiff, XTree } from '../../../node_modules/@dovyih/x-tree-diff/dist/index';
import { IDiffRenderNode } from './DiffRenderNode';
export default class RenderNodeXTreeDiff extends XTreeDiff<IDiffRenderNode> {
    buildXTree(root: IDiffRenderNode): XTree;
    dumpXTree(rootA: XTree<IDiffRenderNode>): IDiffRenderNode;
    private setNodesDiffType;
}
