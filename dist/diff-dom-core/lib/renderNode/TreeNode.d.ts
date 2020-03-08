export declare type TTreeNodeCallback = (node: TreeNode, index?: number, thisArg?: TreeNode | TreeNode[]) => void;
export default abstract class TreeNode {
    parent?: TreeNode;
    children: Set<TreeNode>;
    hasChildren(): boolean;
    forEach(callback: TTreeNodeCallback): void;
    append(child: TreeNode): void;
}
