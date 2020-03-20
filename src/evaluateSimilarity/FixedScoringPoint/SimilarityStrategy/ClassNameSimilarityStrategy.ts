import { CLASS_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class ClassNameSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const distinction = diffNode.className!;
    logs.push(
      `incorent id. expect ${distinction.expect}, actual ${distinction.actual}`,
    );
    return CLASS_SCORE;
  }
}
