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

import { Puppeteer, PageManager } from './pptr/index';
import { readAllFixtures, IFixtureData } from '../fixtures/readFixture';
import { createHTMLTpl } from './utils/index';
import { IRenderNode } from '../lib/renderNode/domCore';
import { strictEqualDiff } from './diffCore/stricly-equal/index';
import { generateDiffResult, IFixedScoringPointResult } from './evaluateSimilarity/fixedScoringPoint';
import { writeFileSync } from 'fs';
import diffBeforeAll from '../test/beforeAll';
import '@auncel/common/polyfill/toJSON';

const fixtureMap = readAllFixtures();
const similarityMap = new Map<string, IFixedScoringPointResult>();

const { M_diffScript, pageManager } = diffBeforeAll();

async function getRenderTree(fixtureData: IFixtureData): Promise<IRenderNode> {
  const { fragment, stylesheet } = fixtureData;
  const html = createHTMLTpl(fragment, stylesheet);
  const page = await pageManager.getPage();
  await page.setContent(html);
  const renderTree: IRenderNode = (await page.evaluate(M_diffScript) as IRenderNode);
  return renderTree;
}
for (const [title, fixtrue] of fixtureMap.entries()) {
  describe(title, () => {
    const { question, answers } = fixtrue;
    for (const answer of answers) {
      let questionRenderTree = null;
      test(answer.description, async () => {
        if (!questionRenderTree) {
          questionRenderTree = await getRenderTree(question)
        }
        const answerRenerTree = await getRenderTree(answer);
        const diffTree = strictEqualDiff(questionRenderTree, answerRenerTree);
        const evaluateResult: any = generateDiffResult(diffTree);
        evaluateResult.expect = answer.similarity;
        similarityMap.set(`${title}: ${question.name} ==> ${answer.name}`, evaluateResult);
        expect(evaluateResult.score * 100 > answer.similarity).toBe(true);
      });
    }
  });
}

afterAll(async () => {
  const dateStr = new Date().toLocaleString().replace(/[,:\s\/]/g,'-');
  writeFileSync(`${__dirname}/../logs/${dateStr}.json`, JSON.stringify(similarityMap,null,2));
  await Puppeteer.close();
});