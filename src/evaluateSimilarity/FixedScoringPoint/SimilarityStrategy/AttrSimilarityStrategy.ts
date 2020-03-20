import { DistinctionType, DiffNode } from '../../../DiffTree/DiffNode';
import { ATTR_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class AttrSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line class-methods-use-this
  evaluate(diffNode: DiffNode, logs: string[]): number {
    const distinctions = diffNode.attr!;
    if (!distinctions || !distinctions.length) return ATTR_SCORE;

    let equalityCount = 0;
    let inequalCount = 0;
    let missingCount = 0;
    // let extraCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const distinction of distinctions) {
    // eslint-disable-next-line default-case
      switch (distinction.type) {
        case DistinctionType.EQUALITY:
          equalityCount++;
          break;
        case DistinctionType.INEQUAL:
          inequalCount++;
          logs.push(`attribute incorent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`);
          break;
        case DistinctionType.MISSING:
          missingCount++;
          logs.push(`missing attribute: ${distinction.key}`);
          break;
      // case DistinctionType.EXTRA:
      //   extraCount++;
      //   break;
      }
    }

    const attrCount = equalityCount + inequalCount + missingCount;
    const attrScore = ATTR_SCORE - ((ATTR_SCORE / attrCount) * (inequalCount + missingCount));
    return attrScore;
  }
}
