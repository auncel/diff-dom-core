import { ID_SCORE } from '../const';
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { getConfig } from '../../../utils/config';
import { IFixedScoringPointEvaluationOption } from '../../../config';

export class IdSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const evaluationOption = getConfig('evaluation') as IFixedScoringPointEvaluationOption ?? {};
    const distinction = diffNode.id;
    if (evaluationOption.isIdStrictlyEqual && distinction && distinction.type !== DistinctionType.EQUALITY) {
      logs.push(
        `incorent id. expect ${distinction.expect}, actual ${distinction.actual}`,
      );
      return ID_SCORE;
    }
    return 0;
  }
}
