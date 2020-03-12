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
import RenderTreeXTreeDiffPlus from './RenderNodeXTreeDiffPlus';
import { plainObject2RenderNode } from './plainObject2RenderNode';

const { div } = require('../../../fixtures/render/diff.json');


const treeOld = plainObject2RenderNode(div.origin);
const treeNew = plainObject2RenderNode(div.padding);
const xTreeDiff = new RenderTreeXTreeDiffPlus(treeOld, treeNew);
const res = xTreeDiff.diff();

// console.log(JSON.stringify(res, null, 2));
