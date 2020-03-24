/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 20th March 2020 10:52 am                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 20th March 2020 10:52 am                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IStrategyContext } from '../../StrategyContext.interface';
import { ISimilarityStrategy } from '../../SimilarityStrategy.interface';
import { DiffType } from '../../../DiffTree/DiffNode';
import { AttrSimilarityStrategy } from './AttrSimilarityStrategy';
import { ClassNameSimilarityStrategy } from './ClassNameSimilarityStrategy';
import { StyleSimilarityStrategy } from './StyleSimilarityStrategy';
import { NodeDeleteSimilarityStrategy } from './NodeDeleteSimilarityStrategy';
import { NodeMoveSimilarityStrategy } from './NodeMoveSimilarityStrategy';
import { NodeInsertSimilarityStrategy } from './NodeInsertSimilarityStrategy';
import { IdSimilarityStrategy } from './IdSimilarityStrategy';
import { RectSimilarityStrategy } from './RectSimilarityStrategy';


/**
 * 差异比较 context，默认初始化 Attr,Attr,Id,Rect,Style 策略
 *
 * @export
 * @class SimilarityStrategyContext
 * @implements {IStrategyContext}
 */
export class SimilarityStrategyContext implements IStrategyContext {
  strategies = new Map<DiffType, ISimilarityStrategy>();

  constructor() {
    this.setStrategy(DiffType.Attr, new AttrSimilarityStrategy());
    this.setStrategy(DiffType.ClassName, new ClassNameSimilarityStrategy());
    this.setStrategy(DiffType.Id, new IdSimilarityStrategy());
    this.setStrategy(DiffType.Rect, new RectSimilarityStrategy());
    this.setStrategy(DiffType.Style, new StyleSimilarityStrategy());
    this.setStrategy(DiffType.NodeDelete, new NodeDeleteSimilarityStrategy());
    this.setStrategy(DiffType.NodeInsert, new NodeInsertSimilarityStrategy());
    this.setStrategy(DiffType.NodeMove, new NodeMoveSimilarityStrategy());
  }

  public setStrategy(diffType: DiffType, strategy: ISimilarityStrategy): void {
    this.strategies.set(diffType, strategy);
  }


  public iterator(): IterableIterator<[DiffType, ISimilarityStrategy]> {
    // return this.strategies.entries();
    const strategies = this.strategies;
    const keys = Array.from(strategies.keys());
    let index = 0;
    const iterator = {
      [Symbol.iterator](): IterableIterator<[DiffType, ISimilarityStrategy]> {
        return {
          [Symbol.iterator](): IterableIterator<[DiffType, ISimilarityStrategy]> {
            return iterator;
          },
          next: iterator.next,
        };
      },
      next(): IteratorResult<[DiffType, ISimilarityStrategy]> {
        if (index < strategies.size) {
          const key = keys[index++];
          return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value: [key, strategies.get(key)!],
            done: false,
          };
        }
        return {
          value: null,
          done: true,
        };
      },
    };

    return iterator;
  }
}
