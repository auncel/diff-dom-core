/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 18th March 2020 10:47 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 18th March 2020 10:47 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import './startup';

describe('startup.ts', () => {
  test('should globalThis has pageManager/M_diffScript property', () => {
    expect(globalThis.pageManager).not.toBeNull();
    expect(globalThis.M_diffScript).not.toBeNull();
  });
});