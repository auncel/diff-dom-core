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
import { IDomDiffCoreOption, generateRenderTreeOptions, fixedScoringPointEvaluation, generateDiffTreeOption } from '../config';
import { mergeWithDefaultConfig } from './mergeWithDefaultConfig';

let configCache: IDomDiffCoreOption = {
  generation: generateRenderTreeOptions,
  diff: generateDiffTreeOption,
  evaluation: fixedScoringPointEvaluation,
};

export function getConfig(properties?: string): any {
  if (typeof properties === 'string') {
    const pathArr = properties.split('.');
    return pathArr.reduce((preV, currV) => preV[currV] ?? {}, configCache) ?? configCache;
  }
  return configCache;
}

/**
 *
 * @param properties
 * @param value
 */
export function setConfig(properties: string, value: IPlainObject): void {
  configCache[properties] = mergeWithDefaultConfig(value, configCache[properties]);
  configCache[properties] = value;
}

/**
 *
 *
 * @export
 */
export function resetConfig(): void {
  configCache = {
    generation: generateRenderTreeOptions,
    diff: generateDiffTreeOption,
    evaluation: fixedScoringPointEvaluation,
  };
}
