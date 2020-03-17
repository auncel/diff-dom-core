/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 8:48 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 7:20 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import { fixedScoringPointGenerateDiffResult } from './fixedScoringPoint';
import { DiffNode } from '../../DiffTree/DiffNode';

const diffTree: DiffNode = require('../../../fixtures/render/diff-tree.json');

describe('github', () => {
  test('login form', () => {
    const result = fixedScoringPointGenerateDiffResult(diffTree);
    expect(result.logs.length).not.toBe(0);
    expect(result.score).not.toBe(0);
  });
});
