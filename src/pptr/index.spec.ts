/* --------------------------------------------------------------------------*
 * Filename: d:\Project\fe-oj\packages\common\puppeteer\index.spec           *
 * Path: d:\Project\fe-oj\packages\common                                    *
 * Created Date: Wednesday, December 11th 2019, 11:03:33 pm                  *
 * Author: yidafu(dov-yih)                                                   *
 *                                                                           *
 * Copyright (c) 2019 None                                                   *
 *-------------------------------------------------------------------------- */

import { Puppeteer } from './index';
jest.setTimeout(30000);

describe('Puppteer', () => {

  test('init Puppteer', async (done) => {
    const pageManager = await Puppeteer.getPageManager({ poolSize: 3 });
    const [page1, page2, page3] = await Promise.all([
      pageManager.getPage(),
      pageManager.getPage(),
      pageManager.getPage(),
    ]);
    const mockFn = jest.fn();
    const page4P = pageManager.getPage()
      .then((page) => { mockFn();return page;});
    expect(mockFn).not.toBeCalled();
    setTimeout(() => {
      expect(pageManager.getAvailablePoolSize()).toBe(0);
      expect(mockFn).not.toBeCalled();
      pageManager.releasePage(page1);
    }, 1000);
    setTimeout(() => {
      expect(mockFn).toBeCalled();
      expect(page4P).resolves.not.toBeNull();
      Puppeteer.close();
      done();
    }, 2000);
  });
  
  test('if param poolSize less then DEFUALT_PAGE_POOL_SIZE it will ignore', async () => {
    const pageManager = await Puppeteer.getPageManager({ poolSize: 3 });

    expect(pageManager.getAvailablePoolSize()).toBe(3)
    expect(pageManager.getPoolSize()).toBe(3)
  });

  afterEach(async () => {
    await Puppeteer.close();
  });
});
