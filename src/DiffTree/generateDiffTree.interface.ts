/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 12:15 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 12:15 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { DiffNode } from './DiffNode';
import ElementRenderNode from '../RenderNode/ElementRenderNode';

export interface IGenerateDiffTree {
  (questio: ElementRenderNode, answer: ElementRenderNode): DiffNode;
}
