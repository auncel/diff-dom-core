import { CLASS_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';

export class ClassNameSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const distinction = diffNode.className;
    if (distinction && distinction.type !== DistinctionType.EQUALITY) {
      logs.push(
        `incorent class. expect ${distinction.expect}, actual ${distinction.actual}`,
      );
      return CLASS_SCORE;
    }
    return 0;
  }
}
