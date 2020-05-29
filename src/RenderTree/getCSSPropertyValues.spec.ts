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
import { getSimpleData } from '../../test/utils';

const { fragment, stylesheet } = getSimpleData()


let $style: HTMLElement;
beforeAll(() => {
  document.body.innerHTML = fragment;
  $style = document.createElement('style');
  $style.id = USER_STYLE_ID;
  document.head.appendChild($style);
  appendUuid(document);
});

beforeEach(() => {
  $style.id = USER_STYLE_ID;
  $style.innerHTML = '';
});

describe('simple jsdom env', () => {
  test('DOM is ready', () => {
    expect(document.body.innerHTML).not.toBeNull();
  });

  test('simple', () => {
    $style.innerHTML = stylesheet;
    const propetyMap = computeElementStyle(document);
    expect(propetyMap.size).toBe(4);
    expect(propetyMap.get('uuid_0_0')!.size).toBe(11);
    expect(propetyMap.get('uuid_0_0')!.get('border-radius')).toBe('10px');
  });

  
  test('doesn\'t hava style tag', () => {
    $style.id = USER_STYLE_ID + 'Extra';
    expect(() => computeElementStyle(document))
      .toThrowError(`should have style#${USER_STYLE_ID}`);
  });

  test('margin shorthand', () => {
    const qustionFixture = readFixture(`${__dirname}/../../fixtures/css/shorthand/margin/margin.question.html`);
    const answer1Fixture = readFixture(`${__dirname}/../../fixtures/css/shorthand/margin/mixed.answer.html`);
    document.body.innerHTML = qustionFixture.fragment;
    appendUuid(document);

    $style.innerHTML = qustionFixture.stylesheet;
    const propetyMap1 = computeElementStyle(document);

    expect(propetyMap1.get('uuid_0_0')!.get('margin')).toBeUndefined();
    expect(propetyMap1.get('uuid_0_0')!.get('margin-top')).toBe('20px');
    expect(propetyMap1.get('uuid_0_0')!.get('margin-right')).toBe('30px');
    expect(propetyMap1.get('uuid_0_0')!.get('margin-bottom')).toBe('40px');
    expect(propetyMap1.get('uuid_0_0')!.get('margin-left')).toBe('50px');

    $style.innerHTML = answer1Fixture.stylesheet;
    const propetyMap2 = computeElementStyle(document);
    expect(propetyMap2.get('uuid_0_0')!.get('margin')).toBeUndefined();
    expect(propetyMap2.get('uuid_0_0')!.get('margin-top')).toBe('20px');
    expect(propetyMap2.get('uuid_0_0')!.get('margin-right')).toBe('30px');
    expect(propetyMap2.get('uuid_0_0')!.get('margin-bottom')).toBe('40px');
    expect(propetyMap2.get('uuid_0_0')!.get('margin-left')).toBe('50px');
  });

  
  test('should ignore z-index', () => {
    const answer1Fixture = readFixture(`${__dirname}/../../fixtures/css/zIndex/1_correct.answer.html`);
    document.body.innerHTML = answer1Fixture.fragment;
    $style.innerHTML = answer1Fixture.stylesheet;

    appendUuid(document);
    const propetyMap1 = computeElementStyle(document);

    expect(propetyMap1.get('uuid_0_0')!.get('z-index')).toBeUndefined();
    expect(propetyMap1.get('uuid_0_1')!.get('z-index')).toBeUndefined();
    expect(propetyMap1.get('uuid_0_2')!.get('z-index')).toBeUndefined();
  });

});
