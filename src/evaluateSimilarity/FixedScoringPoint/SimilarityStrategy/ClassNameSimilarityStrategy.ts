import { CLASS_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { getConfig } from '../../../utils/config';
import { IFixedScoringPointEvaluationOption } from '../../../config';

export class ClassNameSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const evaluationOption = getConfig('evaluation') as IFixedScoringPointEvaluationOption ?? {};
    const distinction = diffNode.className;
    if (evaluationOption.isClassStrictlyEqual
        && distinction
        && distinction.type !== DistinctionType.EQUALITY) {
      logs.push(
        `incorent class. expect ${distinction.expect}, actual ${distinction.actual}`,
      );
      return CLASS_SCORE;
    }
    return 0;
  }
}
