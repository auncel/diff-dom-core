/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 4:20 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 4:20 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IdSimilarityStrategy } from './IdSimilarityStrategy'
import { DiffNode, DistinctionType } from '../../../DiffTree/DiffNode';
import { ID_SCORE } from '../const';
import { resetConfig, setConfig } from '../../../utils/config';


describe('FixedScoringPoint/SimilarityStrategy/Id', () => {
  
  test('if instance can run evaluate', () => {
    const diffNode = new DiffNode();
    diffNode.id = { type: DistinctionType.EQUALITY, actual: 'id', expect: 'id', key: 'id' };
    const logs: string[] = [];
    const score = new IdSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });

  test('if Id is INEQUAL distinction', () => {
    const diffNode = new DiffNode();
    diffNode.id = { type: DistinctionType.INEQUAL, actual: 'id', expect: 'id-1', key: 'id' };

    const logs: string[] = [];
    const score = new IdSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(ID_SCORE);
    expect(logs.length).toBe(1);
  });

  test('if instance.id is undefined', () => {
    const logs: string[] = [];
    const score = new IdSimilarityStrategy().evaluate(new DiffNode(), logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0)
  });
  
  test('if evaluation.isIdStrictlyEqual = false', () => {
    setConfig('evaluation', {
      isIdStrictlyEqual: false,
    });
    const diffNode = new DiffNode();
    diffNode.id = { type: DistinctionType.INEQUAL, actual: 'id', expect: 'id-1', key: 'id' };

    const logs: string[] = [];
    const score = new IdSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(0);
    expect(logs.length).toBe(0);
  });
  
  afterEach(() => {
    resetConfig();
  });
});
