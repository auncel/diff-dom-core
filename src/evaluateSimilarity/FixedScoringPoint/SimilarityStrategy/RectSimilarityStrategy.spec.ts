/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 4:26 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 4:26 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { RectSimilarityStrategy } from './RectSimilarityStrategy'
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { STYLE_SCORE, RECT_SCORE } from '../const';

describe('FixedScoringPoint/SimilarityStrategy/Rect', () => {
  
  test('if instance can run evaluate', () => {
    const diffNode = new DiffNode();
    diffNode.displayRate = { type: DistinctionType.EQUALITY, actual: 100, key: 'displayRate' };
    diffNode.style = [
      { type: DistinctionType.EQUALITY, actual: 100, expect: 100, key: 'top' },
      { type: DistinctionType.EQUALITY, actual: 100, expect: 100, key: 'width' },
    ];

    const logs: string[] = [];
    const score = new RectSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0);
  });

  test('if rect.top epxect 1000, actual 101', () => {
    const diffNode = new DiffNode();
    diffNode.rect = [
      { type: DistinctionType.INEQUAL, actual: 101, expect: 100, key: 'top' }
    ];

    const logs: string[] = [];
    const score = new RectSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBeGreaterThan(0);
    expect(logs.length).toBe(1)
  });

  test('if rect.top epxect 1000, actual 101', () => {
    const diffNode = new DiffNode();
    diffNode.rect = [
      { type: DistinctionType.INEQUAL, actual: 120, expect: 100, key: 'top' }
    ];

    const logs: string[] = [];
    const score = new RectSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(RECT_SCORE);
    expect(logs.length).toBe(1)
  });

  test('if instance.style is undefined', () => {
    const logs: string[] = [];
    const score = new RectSimilarityStrategy().evaluate(new DiffNode(), logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });
});
