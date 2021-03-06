/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 18th March 2020 11:07 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 18th March 2020 11:07 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import {  readFixture } from "../fixtures/readFixture";
import './startup';
import { getRenderTree } from "./getRenderTree";

const simpleFixture = readFixture(__dirname + '/../fixtures/elements/div/simple/simple.question.html');

describe('getRenderTree', () => {
  test('should works', async () => {
    const renderTree = await getRenderTree(simpleFixture)
    expect(typeof globalThis.diffScript).toBe('string');
    expect(renderTree).not.toBeNull();
  });

  test('getRenderTree faild', async () => {
    globalThis.diffScript = '';
    try {
      await getRenderTree(simpleFixture);
    } catch(err) {
      expect(err).toEqual(new Error('must import starup.ts before using getRenderTree!'))
    }
  });
});