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
import * as fs from 'fs';
import { parse } from 'path'
import { execSync } from 'child_process';
import '@auncel/common/polyfill/toJSON';
import RenderTreeXTreeDiffPlus from './RenderNodeXTreeDiffPlus';
import { plainObject2RenderNode } from './plainObject2RenderNode';
import { readFixtures, IFixtureData } from '../../../fixtures/readFixture';
import { DiffNode, DiffType } from '../DiffNode';
import { IPlainObject } from '@auncel/common/types/IPlainObject';
import ElementRenderNode from '../../RenderNode/ElementRenderNode';

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
  return function (answer: IFixtureData, expectFunc: (tree: DiffNode) => void) {
    test(answer.name, () => {
      const treeNew = getRenderTree(answer);
      const xTreeDiff = new RenderTreeXTreeDiffPlus(treeOld, treeNew);
      const { newTree  } = xTreeDiff.diff();
      // fs.writeFileSync(answer.name + '.json', JSON.stringify(newTree, null, 2));
      expectFunc(newTree as unknown as DiffNode);
    });
  };
}

describe(fixture.title, () => {
  const testFunc = testFactory(fixture.question);
  const answerMap: any = fixture.answers.reduce((acc, answer) => {
    acc[parse(answer.filename).name] = answer;
    return acc;
  }, {} as IPlainObject);

  testFunc(
    answerMap['px.answer'],
    (diffNode: DiffNode) => {
      expect(diffNode.diffType).toBe(DiffType.None);
      expect((diffNode.get(0).get(0) as DiffNode).diffType).toBe(DiffType.None);
      expect((diffNode.get(0).get(4) as DiffNode).diffType).toBe(DiffType.None);
    },
  );

  testFunc(
    answerMap['has-extra-child.answer'],
    (diffNode: DiffNode) => {
      expect(diffNode.diffType).toBe(DiffType.None);
      expect((diffNode.get(0).get(5) as DiffNode).subTree).not.toBeNull();
      expect((diffNode.get(0).get(5) as DiffNode).diffType).toBe(DiffType.NodeInsert);
    },
  );

  testFunc(
    answerMap['missing-a-child.answer'],
    (diffNode: DiffNode) => {
      expect(diffNode.diffType).toBe(DiffType.None);
      expect((diffNode.get(0) as DiffNode).diffType).toBe(DiffType.None);
      expect((diffNode.get(0).get(2) as DiffNode).diffType).toBe(DiffType.NodeDelete);
      expect((diffNode.get(0).get(3) as DiffNode).diffType).toBe(DiffType.NodeMove);
      expect((diffNode.get(0).get(4) as DiffNode).diffType).toBe(DiffType.NodeMove);
    },
  );

  // FIXME:  标明乱序情况
  testFunc(
    answerMap['out-of-order.answer'],
    (diffNode: DiffNode) => {
       expect(diffNode.diffType).toBe(DiffType.None);
       console.log(JSON.stringify(diffNode.get(0)))
       expect((diffNode.get(0).get(0) as DiffNode).diffType & DiffType.NodeMove).toBe(DiffType.NodeMove);
       expect((diffNode.get(0).get(4) as DiffNode).diffType & DiffType.NodeMove).toBe(DiffType.NodeMove);
       expect((((diffNode.get(0).get(0) as DiffNode).subTree as ElementRenderNode).index)).toBe(3);
    }
  );
});
