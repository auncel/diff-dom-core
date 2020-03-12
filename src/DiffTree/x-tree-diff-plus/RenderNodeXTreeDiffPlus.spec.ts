/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 29th December 2019 11:59 am                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 29th December 2019 11:59 am                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { execSync } from 'child_process';
import '@auncel/common/polyfill/toJSON';
import RenderTreeXTreeDiffPlus from './RenderNodeXTreeDiffPlus';
import { plainObject2RenderNode } from './plainObject2RenderNode';
import ShadowRenderNode, { ShadowDiffType } from '../../ShadowNode/ShadowRenderNode';
import { readFixtures, IFixtureData } from '../../../fixtures/readFixture';

const fixture = readFixtures('elements/ul/list-group');

function testFactory(question: IFixtureData) {
  function getRenderTree(fixtureData: IFixtureData) {
    const resString = execSync(`node ${__dirname}/../../../bin/index.js --fragment "${
      fixtureData.fragment.split('\n').join('').split('"').join('\\"')
    }" --stylesheet "${
      fixtureData.stylesheet.split('\n').join('').split('"').join('\\"')
    }"`).toString();
    const JsonString = resString.substring(resString.indexOf('{'));
    return plainObject2RenderNode(JSON.parse(JsonString));
  }

  const treeOld = getRenderTree(question);
  return function (answer: IFixtureData, expectFunc: Function) {
    test(answer.name, () => {
      const treeNew = getRenderTree(answer);
      const xTreeDiff = new RenderTreeXTreeDiffPlus(treeOld, treeNew);
      const { newTree } = xTreeDiff.diff();
      expectFunc(newTree);
    });
  };
}

describe(fixture.title, () => {
  const testFunc = testFactory(fixture.question);
  const answerMap: any = fixture.answers.reduce((acc, answer) => {
    acc[answer.filename] = answer;
    return acc;
  }, {} as any);

  testFunc(
    answerMap['px.answer.html'],
    (shadowTree: ShadowRenderNode) => expect(shadowTree.diffType).toBe(ShadowDiffType.NONE),
  );

  testFunc(
    answerMap['has-extra-child.answer.html'],
    (shadowTree: ShadowRenderNode) => {
      expect(shadowTree.diffType).toBe(ShadowDiffType.NONE);
      expect((shadowTree.get(0).get(5) as ShadowRenderNode).diffType).toBe(ShadowDiffType.EXTRA_NODE);
    },
  );

  testFunc(
    answerMap['missing-a-child.answer.html'],
    (shadowTree: ShadowRenderNode) => {
      expect(shadowTree.diffType).toBe(ShadowDiffType.NONE);
      expect((shadowTree.get(0) as ShadowRenderNode).diffType).toBe(ShadowDiffType.SHADOW_CHILDREN);
      expect((shadowTree.get(0) as ShadowRenderNode).shadowChildren[2].diffType).toBe(ShadowDiffType.MISSING_NODE);
    },
  );

  // FIXME: 不能分辨出乱序的情况
  // testFunc(
  //   answerMap['out-of-order.answer.html'],
  //   (shadowTree: ShadowRenderNode) => {
  //      expect(shadowTree.diffType).toBe(ShadowDiffType.NONE);
  //      console.log(JSON.stringify(shadowTree.get(0)))
  //      expect((shadowTree.get(0).get(0) as ShadowRenderNode).diffType).toBe(ShadowDiffType.MOVED_NODE);
  //      expect((shadowTree.get(0).get(3) as ShadowRenderNode).diffType).toBe(ShadowDiffType.MOVED_NODE);
  //   }
  // );
});
