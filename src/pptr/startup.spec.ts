/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 10:46 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 10:46 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import './startup';

jest.setTimeout(30000);

 describe('pptr/startup', () => {
  test('startup.ts should work', () => {
    expect(globalThis.diffScript).not.toBeNull();
    expect(globalThis.pageManager).not.toBeNull();
  })
 });