
import { IDistinctionDetail, TCSSPropertyValueType, DistinctionType } from '../../../DiffTree/DiffNode';
import { STYLE_SCORE } from '../const';

export function evaluateStyleSimlarity(
  styleDistinction: IDistinctionDetail<TCSSPropertyValueType>[], logs: string[],
): number {
  if (!styleDistinction || !styleDistinction.length) return STYLE_SCORE;

  let equalityCount = 0;
  let inequalCount = 0;
  let missingCount = 0;
  let extraCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of styleDistinction) {
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

  const propertyScore = STYLE_SCORE / (equalityCount + inequalCount + (missingCount * 2));
  const score = propertyScore * (missingCount + inequalCount + extraCount);
  return score;
}
