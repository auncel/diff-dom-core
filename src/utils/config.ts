/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 14th March 2020 6:02 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 14th March 2020 6:02 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IPlainObject } from '@auncel/common/types/IPlainObject';


const configCache: IPlainObject = {};

export function getConfig(properties?: string): any {
  if (typeof properties === 'string') {
    return configCache[properties];
  }
  return configCache;
}

/**
 *
 * @param properties
 * @param value
 */
export function setConfig(properties: string, value: IPlainObject): void {
  configCache[properties] = value;
}
