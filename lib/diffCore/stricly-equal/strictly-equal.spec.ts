/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 8th December 2019 5:07 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 5:07 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import { strictEqualDiff } from './strictly-equal';

const { div, loginForm } = require('../../fixtures/render/diff.json');

describe('<div></div>', () => {
  test('left left', () => {
    const distinctions = strictEqualDiff(div.origin, div.origin);
    expect(distinctions).not.toBeNull();
  });

  test('left right', () => {
    const distinctions = strictEqualDiff(div.origin, div.padding);
    expect(distinctions.rect.length).toBe(2);
    expect(distinctions.children[0].style.length).toBe(2);
  });
});

describe('github', () => {
  test('login form', () => {
    const distinctions = strictEqualDiff(loginForm.origin, loginForm.wrong);
    console.log(JSON.stringify(distinctions, null, 2));
    expect(distinctions).not.toBeNull();
  });
});