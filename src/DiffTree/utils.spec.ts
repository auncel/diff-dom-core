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
import { distinctionCompare } from './utils';
import { DistinctionType } from './DiffNode';

describe('utils: objectCompare', () => {
  test('2 equal objects', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {} }, ['a', 'b', 'c']);
    expect(res.length).toBe(3);
  });

  test('2 objects\'s property c is different', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: 'diff' }, ['a', 'b', 'c']);
    expect(res).toEqual([
      { key: 'a', type: DistinctionType.EQUALITY, expect: 1 ,  actual: 1 },
      { key: 'b', type: DistinctionType.EQUALITY, expect: 'string', actual: 'string' },
      { key: 'c', type: DistinctionType.INEQUAL, expect: {}, actual: 'diff' },
    ]);
  });

  test('object2 miss property `b`', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string' }, { a: 1 }, ['a', 'b']);
    expect(res).toEqual([
      { key: 'a', type: DistinctionType.EQUALITY, expect: 1 ,  actual: 1 },
      { key: 'b', type: DistinctionType.MISSING, expect: 'string', actual: undefined },
    ]);
  });

  test('object2 has extra property `d`', () => {
    const res = distinctionCompare<any>({ a: 1, b: 'string', c: {} }, { a: 1, b: 'string', c: {}, d: 'extra' }, ['a', 'b', 'c']);
    expect(res).toEqual([
      { key: 'a', type: DistinctionType.EQUALITY, expect: 1 ,  actual: 1 },
      { key: 'b', type: DistinctionType.EQUALITY, expect: 'string', actual: 'string' },
      { key: 'c', type: DistinctionType.EQUALITY, expect: {}, actual: {} },
      { key: 'd', type: DistinctionType.EXTRA, actual: 'extra', expect: undefined }]);
  });
});
