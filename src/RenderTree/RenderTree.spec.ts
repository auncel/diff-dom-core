/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 24th November 2019 1:07 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:35 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { readFixtures, IFixtureData } from '../../fixtures/readFixture';
import '../../test/startup';
import { getRenderTree} from '../../test/getRenderTree';
import { IElementRenderNode } from '../RenderNode/ElementRenderNode';

declare global {
  interface Window {
    elementPropertyMap: Map<string, Map<string, string>>;
  }
}

const fixtrues = readFixtures(`${__dirname}/../../fixtures/elements/div/simple/`);
const question: IFixtureData = fixtrues.question;
const answers: IFixtureData[] = fixtrues.answers;

// describe('css unit', () => {
//   test('should rem convert to px', async () => {
//     const questionTree = await getRenderTree(question);
//     const answerTree = await getRenderTree(answers[0]);
//     expect((answerTree.children[0] as IElementRenderNode).style.width).toBe('100px');
//     expect(questionTree).toEqual(answerTree);
//   });

//   test('should color convert to rgba format', async () => {
//     const answerTree = await getRenderTree(answers[1]);
//     expect((answerTree.children[0] as IElementRenderNode).style['background-color']).toBe('rgb(255, 0, 0)');
//     expect((answerTree.children[0] as IElementRenderNode).style['color']).toBe('rgb(0, 255, 0)');
//   });
// });

// const displayFixtures = readFixtures(`css/display`);

// describe('css => display', () => {
//   test(displayFixtures.answers[3].description, async () => {
//     const answerTree = await  getRenderTree(displayFixtures.answers[3]);
//     expect(answerTree.children[0].children[3]).toBeUndefined();
//   });
// });

const zIndexFixtures = readFixtures('css/zIndex');

describe('dispalyRate', () => {
  test(zIndexFixtures.question.description, async () => {
    const questionTree = await  getRenderTree(zIndexFixtures.question);
    expect((questionTree.children[0] as IElementRenderNode).displayRate > 35).toBe(true);
    expect((questionTree.children[2] as IElementRenderNode).displayRate > 59).toBe(true);
    expect((questionTree.children[2] as IElementRenderNode).displayRate > 95).toBe(true);
  });
});