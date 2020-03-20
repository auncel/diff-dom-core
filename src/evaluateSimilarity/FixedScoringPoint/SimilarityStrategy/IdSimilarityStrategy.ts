import { ID_SCORE } from '../const';
import { DiffNode } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class IdSimilarigyStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(difffNode: DiffNode, logs: string[]): number {
    const distinction = difffNode.id!;
    logs.push(
      `incorent id. expect ${distinction.expect}, actual ${distinction.actual}`,
    );
    return ID_SCORE;
  }
}
