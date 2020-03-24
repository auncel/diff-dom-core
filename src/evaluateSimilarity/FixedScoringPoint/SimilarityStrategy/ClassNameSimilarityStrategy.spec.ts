/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 4:00 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 4:00 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { ClassNameSimilarityStrategy } from './ClassNameSimilarityStrategy'
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { STYLE_SCORE, CLASS_SCORE } from '../const';


describe('FixedScoringPoint/SimilarityStrategy/ClassName', () => {
  
  test('if instance can run evaluate', () => {
    const diffNode = new DiffNode();
    diffNode.className = { type: DistinctionType.EQUALITY, actual: '.klass', expect: '.klass', key: 'className' };
    const logs: string[] = [];
    const score = new ClassNameSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });

  test('if className is INEQUAL distinction', () => {
    const diffNode = new DiffNode();
    diffNode.className = { type: DistinctionType.INEQUAL, actual: '.klass', expect: '.klass-1', key: 'className' };

    const logs: string[] = [];
    const score = new ClassNameSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(CLASS_SCORE);
    expect(logs.length).toBe(1);
  });

  test('if instance.style is undefined', () => {
    const logs: string[] = [];
    const score = new ClassNameSimilarityStrategy().evaluate(new DiffNode(), logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });
});
