/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 25th December 2019 9:42 pm                       *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 25th December 2019 9:42 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import RenderTreeXTreeDiff from './RenderTreeXTreeDiff';
import { renderNode2DiffRenderNode } from './RenderNode2DiffRenderNode';

const { div } = require('../../../fixtures/render/diff.json');


const treeOld = renderNode2DiffRenderNode(div.origin);
const treeNew = renderNode2DiffRenderNode(div.padding);
const xTreeDiff = new RenderTreeXTreeDiff(treeOld, treeNew);
const res = xTreeDiff.diff();

console.log(JSON.stringify(res, null, 2));
