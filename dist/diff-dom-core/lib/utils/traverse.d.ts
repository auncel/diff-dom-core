import { ITreeNode } from '../renderNode/domCore';
export declare type visitorFn = <T>(node: T, index: number, parent: T | null) => boolean | void;
export declare type TraverseNode = {
    node: ITreeNode;
    index: number;
    parent: ITreeNode | null;
};
export declare function deepFirstTraverse<T extends ITreeNode>(root: T, visitor: visitorFn): void;
export declare function breadthFirstTraverse<T extends ITreeNode>(root: T, visitor: visitorFn): void;
