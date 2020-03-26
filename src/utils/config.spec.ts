/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 1:55 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 1:55 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { setConfig, getConfig, resetConfig } from './config'

describe('/utils/config.ts', () => {
  test('if config util function works', () => {
    setConfig('key', { key: 'value'});
    expect(getConfig('key')).toEqual({ key: 'value' });
    // expect(getConfig()).toEqual({ key: { key: 'value' }});
  });

  test('if getConfig nest property', () => {
    setConfig('key', { subKey: 'text' });
    // expect(getConfig('')).toEqual({ key: { subKey: 'text'}});
    expect(getConfig('key.subKey')).toBe('text');
  });

  test('if not setConfig', () => {
    expect(getConfig('key.subKey')).toEqual({});
  });

  afterEach(() => {
    resetConfig();
  });
});