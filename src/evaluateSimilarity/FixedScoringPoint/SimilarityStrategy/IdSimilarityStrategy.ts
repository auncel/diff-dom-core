import { ID_SCORE } from '../const';
import { IDistinctionDetail } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class IdSimilarigyStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate<String>(distinction: IDistinctionDetail<String>[], logs: string[]): number {
    logs.push(
      `incorent id. expect ${distinction[0].expect}, actual ${distinction[0].actual}`,
    );
    return ID_SCORE;
  }
}
