
import { DistinctionType, DiffNode } from '../../../DiffTree/DiffNode';
import { STYLE_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class StyleSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line class-methods-use-this
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const distinctions = diffNode.style!;

    if (!distinctions || !distinctions.length) return 0;

    let equalityCount = 0;
    let inequalCount = 0;
    let missingCount = 0;
    let extraCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const distinction of distinctions) {
      // eslint-disable-next-line default-case
      switch (distinction.type) {
        case DistinctionType.EQUALITY:
          equalityCount++;
          break;
        case DistinctionType.INEQUAL:
          logs.push(
            `property incorrent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`,
          );
          inequalCount++;
          break;
        case DistinctionType.MISSING:
          logs.push(`missing property: ${distinction.key}`);
          missingCount++;
          break;
        case DistinctionType.EXTRA:
          logs.push(`extra property: ${distinction.key}`);
          extraCount++;
          break;
      }
    }

    const propertyScore = STYLE_SCORE / (equalityCount + inequalCount + (missingCount / 2) + extraCount);
    const score = propertyScore * (missingCount + inequalCount + extraCount);
    return Math.min(score * ((diffNode.displayRate?.actual ?? 1) / 100), STYLE_SCORE);
  }
}
