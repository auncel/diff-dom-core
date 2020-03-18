/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 1st December 2019 8:30 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 1st December 2019 8:30 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { computeElementStyle } from './getCSSPropertyValues';
import { USER_STYLE_ID } from '../utils/const';
import { appendUuid } from './appendUuid';
import { readFixture } from '../../fixtures/readFixture';

const fragment = `
<div class="listItem_listItem">
  <h1>
    <a class="text" href="/post/2019-05-08-separation-in-thousandth">数字表示成千位分隔形式的几种解法</a>
  </h1>
  <p>Wrote @ 2019-12-01</p>
</div>`;

const styesheet = `
.listItem_listItem {
  background-color: #fff;
  padding: 30px 50px;
  margin: 20px;
  box-shadow: 0 7px 7px 7px #eee;
  border-radius: 10px;
}

h1 {
  font-size: 32px;
}

h1 a {
  text-decoration: none;
}

.text {
  padding: 20px;
  color: #333;
}
div p {
  color: #aaa;
}`;


let $style: HTMLElement;
beforeAll(() => {
  document.body.innerHTML = fragment;
  $style = document.createElement('style');
  $style.id = USER_STYLE_ID;
  document.head.appendChild($style);
  appendUuid(document);
});

beforeEach(() => {
  $style.innerHTML = '';
});

describe('simple jsdom env', () => {
  test('DOM is ready', () => {
    expect(document.body.innerHTML).not.toBeNull();
  });

  test('simple', () => {
    $style.innerHTML = styesheet;
    const propetyMap = computeElementStyle(document);
    expect(propetyMap.size).toBe(4);
    expect(propetyMap.get('uuid_0_0')!.size).toBe(11);
  });

  test('margin shorthand', () => {
    const qustionFixture = readFixture(`${__dirname}/../../fixtures/css/shorthand/margin/margin.question.html`);
    const answer1Fixture = readFixture(`${__dirname}/../../fixtures/css/shorthand/margin/mixed.answer.html`);
    document.body.innerHTML = qustionFixture.fragment;
    appendUuid(document);

    $style.innerHTML = qustionFixture.stylesheet;
    const propetyMap1 = computeElementStyle(document);

    $style.innerHTML = answer1Fixture.stylesheet;
    const propetyMap2 = computeElementStyle(document);
    expect(propetyMap1).toEqual(propetyMap2);
  });
});
