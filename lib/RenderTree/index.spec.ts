/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 7th December 2019 9:08 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:08 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { Puppeteer } from '../pptr/index';
import { IRenderNode } from '../../lib/renderNode/domCore';
import { createHTMLTpl } from '../utils/index';
import diffBeforeAll, { pageManager, M_diffScript } from '../../test/beforeAll';
import '@auncel/common/polyfill/toJSON';

const divSimple = require('../../fixtures/render/simple.json');
const loginFormSimple = require('../../fixtures/render/login-form.wrong.json');

diffBeforeAll();

function testFactory(prefix, data) {
  const { title, fragment, stylesheet, anwser } = data;
  test(`${prefix} ${title}`, async () => {
    const html = createHTMLTpl(fragment, stylesheet);
    const page = await pageManager.getPage();
    await page.setContent(html);
    const renderTree: IRenderNode = (await page.evaluate(M_diffScript) as IRenderNode);
    expect(JSON.parse(JSON.stringify(renderTree))).toEqual(anwser);
    pageManager.releasePage(page);
  });
}

describe('simple world', () => {
  divSimple.forEach(example => testFactory('相等测试',example));
});

describe('complex world', () => {
  testFactory('github login form', loginFormSimple);
});

afterAll(async () => {
  await Puppeteer.close();
  // pageManager.closeAll();
});

// function getRenderTree(fixture: IFixtureData) {
//   const { fragment, stylesheet, } = fixture;
//   const html = htmlWrap(fragment, stylesheet);
//   return pageManager.getPage().then((page) => {
//     return page.setContent(html).then(() => {
//       return page.evaluate(M_diffScript).finally(() => pageManager.releasePage(page));
//     });
//   });
// }

// describe('div simple', () => {
//   beforeEach(() => {
//     jest.setTimeout(10_000);
//   });

//   async function textFixtureFactory(fixture: IFixture) {
//     const { question, answers } = fixture;
//     const questionRenderTree = await getRenderTree(question);
//     const answerRenderTrees = await Promise.all(answers.map(answer => getRenderTree(answer)));

//     for (const tree of answerRenderTrees) {
//       test(question.name, () => {
//         expect(tree).toEqual(questionRenderTree);
//       }, 10_000);
//     }
//   }

//    readFixtures(__dirname + '/../../fixtures/elements/div/simple/')
//     .then(fixture => {
//       textFixtureFactory(fixture);
//     });
//   // test('async', async () => {
//   //   const fixture = readFixtures(__dirname + '/../../fixtures/elements/div/simple/')
//   //   textFixtureFactory(fixture);
//   // });
// });