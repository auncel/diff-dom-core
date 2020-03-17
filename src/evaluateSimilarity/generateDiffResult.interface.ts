/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 3:53 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 3:53 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { IDiffLog } from "./DiffLog.interface";
import { DiffNode } from "../DiffTree/DiffNode";
import { INodeCompare } from "./nodeCompare.interface";

export interface IDiffResult {
  score: number,
  logs: IDiffLog[],
}

export interface IGenerateDiffResult {
  (root: DiffNode, options: {
    beforTraverse?: () => void,
    nodeCompareFn: INodeCompare,
    afterTraverse: (totalScore: number, nodeCount: number, logs: IDiffLog[]) => IDiffResult;
  }): IDiffResult;
}