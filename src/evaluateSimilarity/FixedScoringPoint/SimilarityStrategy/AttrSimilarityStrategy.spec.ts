/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 3:40 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 3:40 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { AttrSimilarityStrategy } from './AttrSimilarityStrategy'
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { ATTR_SCORE } from '../const';


describe('FixedScoringPoint/SimilarityStrategy/Attr', () => {
  
  test('if instance can run evaluate', () => {
    const diffNode = new DiffNode();
    diffNode.attr = [
      { type: DistinctionType.EQUALITY, actual: 'title', expect: 'title', key: 'title' },
      { type: DistinctionType.INEQUAL, actual: 'june', expect: 'john', key: 'name' },
      { type: DistinctionType.MISSING, actual: undefined, expect: 'title', key: 'label' },
    ];

    const logs: string[] = [];
    const score = new AttrSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBeGreaterThan(0);
    expect(logs.length).toBe(2);
  });

  test('if instance.attr is undefined', () => {
    const logs: string[] = [];
    const score = new AttrSimilarityStrategy().evaluate(new DiffNode(), logs);
    expect(score).toBe(ATTR_SCORE);
    expect(logs.length).toBe(0);
  });
});
