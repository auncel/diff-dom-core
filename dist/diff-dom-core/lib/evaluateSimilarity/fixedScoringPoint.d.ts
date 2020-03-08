import { IDiffNode, IDiffLog } from '@surpass/common/types/domCore';
export interface IFixedScoringPointResult {
    score: number;
    logs: IDiffLog[];
}
export declare function generateDiffResult(root: IDiffNode): IFixedScoringPointResult;
