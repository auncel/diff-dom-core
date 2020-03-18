/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 12:17 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 12:17 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IGenerateDiffTree } from './generateDiffTree.interface';
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import RenderTreeXTreeDiffPlus from './x-tree-diff-plus/RenderNodeXTreeDiffPlus';
import { DiffNode } from './DiffNode';

export const xTreeDiffPlustGenerateDiffTree: IGenerateDiffTree = (
  question: ElementRenderNode, answer: ElementRenderNode,
): DiffNode => {
  const xTreeDiffPlus = new RenderTreeXTreeDiffPlus(question, answer);
  const { newTree } = xTreeDiffPlus.diff();
  // FIXME: remove `as unknown as DiffNode`
  return newTree as unknown as DiffNode;
};
