/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 11th December 2019 10:08 pm                      *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 11th December 2019 10:08 pm                     *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

// import '@auncel/common/polyfill/toJSON';
import { Puppeteer } from './pptr/index';
import { readAllFixtures, IFixtureData } from '../fixtures/readFixture';
// import { strictEqualDiff } from './diffCore/stricly-equal/index';
import { xTreeDiffPlustGenerateDiffTree } from './DiffTree/xTreeDiffPlusGenerateDiffTree'
import { fixedScoringPointGenerateDiffResult,  } from './evaluateSimilarity/';
import { writeFileSync } from 'fs';
import { IDiffResult } from './evaluateSimilarity/generateDiffResult.interface';
import '../test/startup';
import { getRenderTree } from '../test/getRenderTree';
import { plainObject2RenderNode } from './DiffTree/x-tree-diff-plus/plainObject2RenderNode';

const fixtureMap = readAllFixtures();
const similarityMap = new Map<string, IDiffResult>();



for (const [title, fixtrue] of fixtureMap.entries()) {
  describe(title, () => {
    const { question, answers } = fixtrue;
    for (const answer of answers) {
      test(answer.description, async () => {
        const  questionRenderTree = plainObject2RenderNode(await getRenderTree(question));
        const answerRenerTree = plainObject2RenderNode(await getRenderTree(answer));
        const diffTree = xTreeDiffPlustGenerateDiffTree(questionRenderTree, answerRenerTree);
        const evaluateResult: any = fixedScoringPointGenerateDiffResult(diffTree);
        evaluateResult.expect = answer.similarity;
        similarityMap.set(`${title}: ${question.name} ==> ${answer.name}`, evaluateResult);
        expect(evaluateResult.score * 100 > answer.similarity).toBe(true);
      });
    }
  });
}

afterAll(async () => {
  console.log(similarityMap);
  const dateStr = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
  writeFileSync(`${__dirname}/../logs/${dateStr}.json`, JSON.stringify(similarityMap, null, 2));
  await Puppeteer.close();
});
