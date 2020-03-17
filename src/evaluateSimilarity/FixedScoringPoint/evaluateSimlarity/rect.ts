import { IDistinctionDetail } from "../../../DiffTree/DiffNode";
import { RECT_SCORE } from "../const";

export function evaluateRectSimlarity(
  rectDistinctions: IDistinctionDetail<number>[], logs: string[],
): number {
  let rectScore = 0;

  if (!rectDistinctions || !rectDistinctions.length) return rectScore;

  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of rectDistinctions) {
    const distance = Math.abs(distinction.actual! - distinction.expect!);
    // shouldn't greater then (RECT_SCORE / 4)
    rectScore += distance * Math.log2(distance + 1);

    switch (distinction.key) {
      case 'height':
      case 'width':
        logs.push(
          `incrorent ${distinction.key}. expect ${distinction.expect}px, but actual ${distinction.actual}px `,
        );
        break;
      case 'top':
      case 'left':
        logs.push(
          `relative position incrorent. ${distinction.key} expect ${distinction.expect}px, not ${distinction.actual}px`,
        );
        break;
      default:
    }
  }
  return Math.min(rectScore, RECT_SCORE);
}
