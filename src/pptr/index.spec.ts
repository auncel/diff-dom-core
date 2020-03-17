/* --------------------------------------------------------------------------*
 * Filename: d:\Project\fe-oj\packages\common\puppeteer\index.spec           *
 * Path: d:\Project\fe-oj\packages\common                                    *
 * Created Date: Wednesday, December 11th 2019, 11:03:33 pm                  *
 * Author: yidafu(dov-yih)                                                   *
 *                                                                           *
 * Copyright (c) 2019 None                                                   *
 *-------------------------------------------------------------------------- */

import { Puppeteer } from './index';


describe('Puppteer', () => {
  test('init Puppteer', async (done) => {
    const pageManager = await Puppeteer.getPageManager({ poolSize: 2 });
    const [page1, page2] = await Promise.all([
      pageManager.getPage(),
      pageManager.getPage(),
    ]);
    const page3P = pageManager.getPage();
    setTimeout(() => {
      expect(pageManager.getAvailablePoolSize()).toBe(0);
      pageManager.releasePage(page1);
    }, 1000);
    setTimeout(() => {
      expect(page3P).resolves.not.toBeNull();
      Puppeteer.close();
      done();
    }, 2000);
  });
});

