import { IDistinctionDetail, DistinctionType } from "../../DiffTree/DiffNode";
import { ATTR_SCORE } from "../const";


export function evaluateAttrSimlarity(
  attrDistinction: IDistinctionDetail<TAttrPropertyType>[], logs: string[],
): number {
  if (!attrDistinction || !attrDistinction.length) return ATTR_SCORE;

  let equalityCount = 0;
  let inequalCount = 0;
  let missingCount = 0;
  // let extraCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of attrDistinction) {
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