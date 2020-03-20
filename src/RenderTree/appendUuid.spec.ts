/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Monday, 2nd December 2019 10:16 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Monday, 2nd December 2019 10:16 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

import { getSimpleData } from '../../test/utils';
import { appendUuid, UUID_ATTR } from './appendUuid';

const { fragment } = getSimpleData();

beforeEach(() => {
  document.body.innerHTML = fragment;
});

describe('append UUID to Element', () => {
  test('simple', () => {
    appendUuid(document);
    expect(document.body.getAttribute(UUID_ATTR)).toBe('uuid_0');
    expect(document.querySelector('.listItem_listItem')!.getAttribute(UUID_ATTR)).toBe('uuid_0_0');
    expect((document.body.firstElementChild!.lastElementChild! as Element).getAttribute(UUID_ATTR)).toBe('uuid_0_0_1');
  });
});
