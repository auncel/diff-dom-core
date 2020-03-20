/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 26th November 2019 8:48 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 7:20 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import { fixedScoringPointGenerateDiffResult } from './fixedScoringPoint';
import { DiffNode } from '../../DiffTree/DiffNode';
import '../../../test/startup';
import '../../../test/getRenderTree';
import { readFixtures, IFixtureData } from '../../../fixtures/readFixture';
import { getRenderTree } from '../../../test/getRenderTree';
import RenderTreeXTreeDiffPlus from '../../DiffTree/x-tree-diff-plus/RenderNodeXTreeDiffPlus';
import { plainObject2RenderNode } from '../../DiffTree/x-tree-diff-plus/plainObject2RenderNode';

const simpleFixtures = readFixtures('elements/div/simple');

async function getDiffTree(question: IFixtureData, answer: IFixtureData): Promise<DiffNode> {
  const oTree = plainObject2RenderNode(await getRenderTree(question));
  const nTree = plainObject2RenderNode(await getRenderTree(answer));
  const xTreeDiffPlus =  new RenderTreeXTreeDiffPlus(oTree, nTree);
  const { newTree } = xTreeDiffPlus.diff();
  return newTree as unknown as DiffNode;
}

describe(simpleFixtures.title, () => {
  test(simpleFixtures.answers[0].name, async () => {
    const diffTree = await getDiffTree(simpleFixtures.question, simpleFixtures.answers[0]);
    const result = fixedScoringPointGenerateDiffResult(diffTree);
    expect(result.logs.length).toBe(0);
    expect(result.score).toBe(100);
  });

  test(simpleFixtures.answers[1].name, async () => {
    const diffTree = await getDiffTree(simpleFixtures.question, simpleFixtures.answers[1]);
    const result = fixedScoringPointGenerateDiffResult(diffTree);
    expect(result.logs.length).not.toBe(0);
    expect(result.score > 50).toBe(true);
  });
});
