import { ID_SCORE } from '../const';
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class IdSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const distinction = diffNode.id;
    if (distinction && distinction.type !== DistinctionType.EQUALITY) {
      logs.push(
        `incorent id. expect ${distinction.expect}, actual ${distinction.actual}`,
      );
      return ID_SCORE;
    }
    return 0;
  }
}
