/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 3:54 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 3:54 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */


import { StyleSimilarityStrategy } from './StyleSimilarityStrategy'
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { STYLE_SCORE } from '../const';


describe('FixedScoringPoint/SimilarityStrategy/Style', () => {
  
  test('if instance can run evaluate', () => {
    const diffNode = new DiffNode();
    diffNode.displayRate = { type: DistinctionType.EQUALITY, actual: 100, key: 'displayRate' };
    diffNode.style = [
      { type: DistinctionType.EQUALITY, actual: 'red', expect: 'red', key: 'color' },
      { type: DistinctionType.INEQUAL, actual: '15px', expect: '14px', key: 'font-size' },
      { type: DistinctionType.MISSING, actual: undefined, expect: 'inline', key: 'display' },
    ];
    
    const logs: string[] = [];
    const score = new StyleSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBeGreaterThan(0);
    expect(logs.length).toBe(2)
  });

  test('if no EQUALITY style distinction', () => {
    const diffNode = new DiffNode();
    diffNode.displayRate = { type: DistinctionType.EQUALITY, actual: 100, key: 'displayRate' };
    diffNode.style = [
      { type: DistinctionType.INEQUAL, actual: '15px', expect: '14px', key: 'font-size' },
      { type: DistinctionType.MISSING, actual: undefined, expect: 'inline', key: 'display' },
    ];
    
    const logs: string[] = [];
    const score = new StyleSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(STYLE_SCORE);
    expect(logs.length).toBe(2)
  });

  test('if instance.style is undefined', () => {
    const logs: string[] = [];
    const score = new StyleSimilarityStrategy().evaluate(new DiffNode(), logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });
});
