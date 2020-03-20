/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 11:42 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 11:42 am                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { SimilarityStrategyContext } from './SimilarityStrategyContext'

describe('StrategyContext', () => {
  test('StrategyContext#iterator', () => {
    const context = new SimilarityStrategyContext();
    const mockFn = jest.fn()
    for (const [diffType, strategy] of context.iterator()) {
      mockFn();
      expect(strategy.evaluate).toBeDefined();
    }
    expect(mockFn.mock.calls.length).toBe(8);
  });
});