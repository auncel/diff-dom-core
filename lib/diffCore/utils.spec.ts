/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 11:20 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 26th November 2019 11:20 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { DistinctionType } from '../renderNode/domCore';
import { distinctionCompare } from './utils';

describe('utils: objectCompare', () => {
  test('2 equal objects', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {} }, ['a', 'b', 'c']);
    expect(res.length).toBe(0);
  });

  test('2 objects\'s property c is different', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: 'diff' }, ['a', 'b', 'c']);
    expect(res).toEqual([{ key: 'c', type: DistinctionType.INEQUAL, expect: {}, actual: 'diff' }]);
  });

  test('object2 miss property `b`', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string' }, { a: 1 }, ['a', 'b']);
    expect(res).toEqual([{ key: 'b', type: DistinctionType.MISSING, expect: 'string' }]);
  });

  test('object2 has extra property `d`', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {}, d: 'extra' }, ['a', 'b', 'c']);
    expect(res).toEqual([{ key: 'd', type: DistinctionType.EXTRA, actual: 'extra', expect: null }]);
  });
});