/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 10:53 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 10:53 am                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { ISimilarityStrategy } from './SimilarityStrategy.interface';
import { DiffType } from '../DiffTree/DiffNode';


/**
 * @see https:// basarat.gitbook.io/typescript/future-javascript/iterators
 *
 * @export
 * @interface IStrategyContext
 */
export interface IStrategyContext {
  // strategy: Set<[DiffType, ISimilarityStrategy]>;
  setStrategy(diffType: DiffType, strategy: ISimilarityStrategy): void;

  iterator(): IterableIterator<[DiffType, ISimilarityStrategy]>;
}
