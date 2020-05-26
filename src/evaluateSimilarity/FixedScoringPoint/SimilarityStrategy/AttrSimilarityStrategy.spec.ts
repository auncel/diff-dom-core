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
import { setConfig, resetConfig } from '../../../utils/config';
import { IFixedScoringPointEvaluationOption } from '../../../config';

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

  test('if config evaluation.attr.list is [\'title\', \'name\']', () => {
    const diffNode = new DiffNode();
    diffNode.attr = [
      { type: DistinctionType.EQUALITY, actual: 'title', expect: 'title', key: 'title' },
      { type: DistinctionType.INEQUAL, actual: 'june', expect: 'john', key: 'name' },
      { type: DistinctionType.MISSING, actual: undefined, expect: 'title', key: 'label' },
    ];

    setConfig('evaluation', {
      attrs: {
        list: ['title', 'name'],
      }
    } as IFixedScoringPointEvaluationOption)
    const logs: string[] = [];
    const score = new AttrSimilarityStrategy().evaluate(diffNode, logs);
    expect(score).toBe(ATTR_SCORE / 2);
    expect(logs.length).toBe(1);
  });

  test('if config evaluation.attr.isStrict is true', () => {
    const diffNode = new DiffNode();
    diffNode.attr = [
      { type: DistinctionType.EQUALITY, actual: 'title', expect: 'title', key: 'title' },
      { type: DistinctionType.INEQUAL, actual: 'june', expect: 'john', key: 'name' },
      { type: DistinctionType.EXTRA, expect: undefined, actual: 'title', key: 'label' },
    ];

    setConfig('evaluation', {
      attrs: {
        isStrict: true,
      },
    } as IFixedScoringPointEvaluationOption)
    const logs: string[] = [];
    const score = new AttrSimilarityStrategy().evaluate(diffNode, logs);
    expect(score.toPrecision(10)).toBe((ATTR_SCORE / 3).toPrecision(10));
    expect(logs.length).toBe(1);
  });

  afterEach(() => {
    resetConfig();
  });
});
