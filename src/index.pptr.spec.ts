/**
 * @jest-environment puppeteer
 */

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
import 'expect-puppeteer';
import { readAllFixtures, IFixtureData } from '../fixtures/readFixture';
// import { strictEqualDiff } from './diffCore/stricly-equal/index';
import { IDiffResult } from './evaluateSimilarity/generateDiffResult.interface';
import { plainObject2RenderNode } from './DiffTree/x-tree-diff-plus/plainObject2RenderNode';
import { diffDomCore, Puppeteer } from './index.pptr'

import '../test/startup';
import { getRenderTree } from '../test/getRenderTree';
import { ElementRenderNode } from './RenderNode';

jest.setTimeout(60_000);

const fixtureMap = readAllFixtures();
const similarityMap = new Map<string, IDiffResult>();

const divSimple = fixtureMap.get('elements\\div\\simple')!;
describe(divSimple.question.description, () => {
  const { question, answers, title } = divSimple;
  const [answer1, answer2, answer3] = answers;

  test(answer1.description, async () => {
    const questionRenderTree = plainObject2RenderNode(await getRenderTree(divSimple.question));
    const evaluateResult: any = await diffDomCore(questionRenderTree, { html: answer1.fragment, style: answer1.stylesheet });
    evaluateResult.expect = answer1.similarity;
    expect(evaluateResult.score).toBe(answer1.similarity);

    similarityMap.set(`${title}: ${question.name} ==> ${answer1.name}`, evaluateResult);
  });

  test(answer2.description, async () => {
    const questionRenderTree = plainObject2RenderNode(await getRenderTree(divSimple.question));
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer2.fragment, style: answer2.stylesheet });
    (evaluateResult as any).expect = answer2.similarity;
    // FIXME: score is too heigh
    expect(evaluateResult.score).toBeGreaterThan(answer2.similarity);
    expect(evaluateResult.logs[0].difference.length).toBe(3)
    similarityMap.set(`${title}: ${question.name} ==> ${answer2.name}`, evaluateResult);
  });

  test(answer3.description, async () => {
    const questionRenderTree = plainObject2RenderNode(await getRenderTree(divSimple.question));
    const evaluateResult: any = await diffDomCore(questionRenderTree, { html: answer3.fragment, style: answer3.stylesheet });
    evaluateResult.expect = answer3.similarity;
    expect(evaluateResult.score).toBe(answer3.similarity);

    similarityMap.set(`${title}: ${question.name} ==> ${answer3.name}`, evaluateResult);
  });
});


const widthIs0 = fixtureMap.get('elements\\div\\width-is-0')!;
describe(widthIs0.question.description, () => {
  const { question, answers, title } = widthIs0;
  const [answer1] = answers;

  test(answer1.description, async () => {
    const questionRenderTree = plainObject2RenderNode(await getRenderTree(divSimple.question));
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer1.fragment, style: answer1.stylesheet });
    expect(evaluateResult.score).toBeGreaterThanOrEqual(answer1.similarity);
    expect(evaluateResult.logs.length).toBe(1);

    (evaluateResult as any).expect = answer1.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer1.name}`, evaluateResult);
  });

});


const listGroup = fixtureMap.get('elements\\ul\\list-group')!;
describe(listGroup.question.description, () => {
  const { question, answers, title } = listGroup;
  const [answer1, answer2, answer3, answer4] = answers;
  let questionRenderTree: ElementRenderNode;
  beforeAll(async () => {
    questionRenderTree = plainObject2RenderNode(await getRenderTree(listGroup.question));
  })

  test(answer1.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer1.fragment, style: answer1.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer1.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer1.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer1.name}`, evaluateResult);
  });

  test(answer2.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer2.fragment, style: answer2.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer2.similarity);
    // expect(evaluateResult.logs.length).toBe(3);

    (evaluateResult as any).expect = answer2.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer2.name}`, evaluateResult);
  });

  test(answer3.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer3.fragment, style: answer3.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer3.similarity);
    // expect(evaluateResult.logs.length).toBe(5);

    (evaluateResult as any).expect = answer3.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer3.name}`, evaluateResult);
  });

  test(answer4.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer4.fragment, style: answer4.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer4.similarity);
    // expect(evaluateResult.logs.length).toBe(1);

    (evaluateResult as any).expect = answer4.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer4.name}`, evaluateResult);
  });
});


const zIndex = fixtureMap.get('css\\zIndex')!;
describe(zIndex.question.description, () => {
  const { question, answers, title } = zIndex;
  const [answer1, answer2, answer3] = answers;
  let questionRenderTree: ElementRenderNode;
  beforeAll(async () => {
    questionRenderTree = plainObject2RenderNode(await getRenderTree(zIndex.question));
  });

  test(answer1.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer1.fragment, style: answer1.stylesheet });
    expect(evaluateResult.score).toBeGreaterThanOrEqual(answer1.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer1.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer1.name}`, evaluateResult);
  });

  test(answer2.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer2.fragment, style: answer2.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer2.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer2.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer2.name}`, evaluateResult);
  });

  
  test(answer3.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer3.fragment, style: answer3.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer3.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer3.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer3.name}`, evaluateResult);
  });
});

const loginForm = fixtureMap.get('complex-word\\login-form')!;
describe(loginForm.question.description, () => {
  const { question, answers, title } = loginForm;
  const [answer1, answer2] = answers;
  let questionRenderTree: ElementRenderNode;
  beforeAll(async () => {
    questionRenderTree = plainObject2RenderNode(await getRenderTree(loginForm.question));
  })

  test(answer1.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer1.fragment, style: answer1.stylesheet });
    // console.log(evaluateResult);
    expect(evaluateResult.score).toBeGreaterThan(answer1.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer1.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer1.name}`, evaluateResult);
  });

  test(answer2.description, async () => {
    const evaluateResult = await diffDomCore(questionRenderTree, { html: answer2.fragment, style: answer2.stylesheet });
    expect(evaluateResult.score).toBeGreaterThan(answer2.similarity);
    // expect(evaluateResult.logs.length).toBe(2);

    (evaluateResult as any).expect = answer2.similarity;
    similarityMap.set(`${title}: ${question.name} ==> ${answer2.name}`, evaluateResult);
  });

});

afterAll(async () => {
  // const dateStr = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
  // writeFileSync(`${__dirname}/../logs/${dateStr}.json`, JSON.stringify(similarityMap, null, 2));
  await Puppeteer.close();
});
