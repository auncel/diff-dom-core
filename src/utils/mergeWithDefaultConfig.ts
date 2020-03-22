/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st March 2020 11:38 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st March 2020 11:38 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IPlainObject } from '@auncel/common/types/IPlainObject';
import isPlainObject from 'lodash/isPlainObject';
import { typeOf } from './index';
import { ConfigConflictException } from '../exceptions';

/**
 * deep merge config with default confit
 *
 * @export
 * @param {IPlainObject} config
 * @param {IPlainObject} [defaultConfig={}]
 * @returns {IPlainObject}
 */
export function mergeWithDefaultConfig(
  config: IPlainObject,
  defaultConfig: IPlainObject = {},
): IPlainObject {
  Object.keys(defaultConfig).forEach((key) => {
    const option = key;
    if (typeof config[option] !== 'undefined') {
      if (typeOf(config[option]) !== typeOf(defaultConfig[option])) {
        throw new ConfigConflictException(
          `option ${option}'s type: ${
            typeOf(config[option])
          } must be the same as default config's type: ${typeOf(defaultConfig[option])}`,
        );
      }
      if (Array.isArray(defaultConfig[option])) {
        config[option] = [...defaultConfig[option], ...config[option]];
      } else if (isPlainObject(config[option])) {
        config[option] = mergeWithDefaultConfig(config[option], defaultConfig[option]);
      }
    } else {
      config[option] = defaultConfig[option];
    }
  });
  return config;
}
