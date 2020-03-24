import { RECT_SCORE } from '../const';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';

export class RectSimilarityStrategy implements ISimilarityStrategy {
  // eslint-disable-next-line
  evaluate(diffNode: DiffNode, logs: string[]): number {
    let rectScore = 0;
    const distinctions = diffNode.rect;
    if (!distinctions || !distinctions.length) return rectScore;

    // eslint-disable-next-line no-restricted-syntax
    for (const distinction of distinctions) {
      if (distinction.type !== DistinctionType.EQUALITY) {
      // FIXME: default 0 is not very reasonable
        const distance = Math.abs(Number(distinction.actual ?? 0) - Number(distinction.expect ?? 0));

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
    }

    return Math.min(rectScore, RECT_SCORE);
  }
}
