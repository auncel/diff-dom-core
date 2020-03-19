import { IDistinctionDetail } from '../../../DiffTree/DiffNode';
import { RECT_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';

export class RectSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate<Number>(distinctions: IDistinctionDetail<Number>[], logs: string[]): number {
    let rectScore = 0;

    if (!distinctions || !distinctions.length) return rectScore;

    // eslint-disable-next-line no-restricted-syntax
    for (const distinction of distinctions) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const distance = Math.abs(Number(distinction.actual ?? 0) - Number(distinction.expect ?? 0));
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
}
