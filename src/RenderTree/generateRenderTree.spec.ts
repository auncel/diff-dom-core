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

import { generateRenderTree } from './generateRenderTree';
import { readFixtures, IFixtureData } from '../../fixtures/readFixture';
import { USER_STYLE_ID } from '../utils/const';
import { computeElementStyle } from './getCSSPropertyValues';
import { UnionRenderNode } from '../DiffTree/x-tree-diff-plus/RenderNodeXTreeDiffPlus';

declare global {
  interface Window {
    elementPropertyMap: Map<string, Map<string, string>>;
  }
}

function getRenderTree(fixture: IFixtureData): UnionRenderNode  {
  // if (!fixture) return null;
  const { fragment, stylesheet } = fixture;
  let $userStyle = document.getElementById(USER_STYLE_ID);
  if (!$userStyle) {
    $userStyle = document.createElement('style');
    $userStyle.id = USER_STYLE_ID;
    document.head.appendChild($userStyle);
  }

  $userStyle.innerHTML = stylesheet;
  window.elementPropertyMap = computeElementStyle(document);
  document.body.innerHTML = fragment;
  const tree = generateRenderTree(document.body);
  return tree;
}

const fixtrues = readFixtures(`${__dirname}/../../fixtures/elements/button/bootstrap/`);

const question: IFixtureData = fixtrues.question;
const answers: IFixtureData[] = fixtrues.answers;

beforeAll(() => {
  jest.setTimeout(10_000);
}, 10_000);

describe('bootstrap', () => {
  test('button', () => {
    const questionTree = getRenderTree(question as IFixtureData);
    for (const answer of answers) {
      const answerTree = getRenderTree(answer as IFixtureData);
      expect(questionTree).toEqual(answerTree);
    }
  });
});
