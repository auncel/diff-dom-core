/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st March 2020 11:39 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st March 2020 11:39 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { mergeWithDefaultConfig } from './mergeWithDefaultConfig'
import { ConfigConflictException } from '../exceptions'

const config1 = {
  key1: 'string',
  key2: 2,
  key3: ['opt1', 'opt2']
}
const config2 = {
  key1: 'string2',
  key2: 3,
  key3: ['opt3', 'opt4']
}

const config3 = {
  key1: 'string2',
  key2: 3,
  key3: ['opt3', 'opt4'],
  key4: 'key4',
}

const config4 = {
  key1: 'string2',
  key2: 3,
  key3: ['opt3', 'opt4'],
  key4: {subkey: 'subkey'},
}

const config5 = {
  key1: 'string2',
  key2: 3,
  key3: ['opt3', 'opt4'],
  key4: {subkey: 'config5 subkey'},
}

describe('utils/mergeWithDefaultConfig', () => {
  test('shadow case', () => {
    const config = mergeWithDefaultConfig(config1,config2);
    expect(config.key1).toBe('string');
    expect(config.key2).toBe(2),
    expect(config.key3.length).toBe(4);
  });

  test('should default config work', () => {
    const config = mergeWithDefaultConfig(config1,config3);
    expect(config.key4).toBe('key4');
  });

  test('should deep merge config', () => {
    const config = mergeWithDefaultConfig(config5, config4);
    expect(config.key4.subkey).toBe('config5 subkey');
  });

  test('should throw a ConfigConflictException', () => {
    expect(() => {
      mergeWithDefaultConfig(config3, config4);
    }).toThrow('option key4\'s type: String must be the same as default config\'s type: Object');
  });
});