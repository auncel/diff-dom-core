/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 7th December 2019 9:08 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th December 2019 9:08 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
// why???
// import '@auncel/common/polyfill/toJSON';

import { getRenderTree } from '../../test/getRenderTree';
import { readFixtures } from '../../fixtures/readFixture';
import { IElementRenderNode } from '../RenderNode/ElementRenderNode';
import { NodeType } from '../RenderNode/enum';
import '../../test/startup';
import TextRenderNode from '../RenderNode/TextRenderNode';

const simpleFixture = readFixtures('elements/div/simple');
const ulFixture = readFixtures('elements/ul/list-group')

describe(simpleFixture.title, () => {
  test(simpleFixture.question.name, async () => {
    const renderTree: IElementRenderNode = await getRenderTree(simpleFixture.question);
    expect(renderTree.index).toBe(0);
    expect(renderTree.children[0].nodeType).toBe(NodeType.ELEMENT_NODE)
    expect(renderTree.children[0].tagName).toBe('DIV');
    expect((renderTree.children[0] as IElementRenderNode).style.width).toBe('100px');
  });

  test(simpleFixture.answers[1].name, async () => {
    const renderTree: IElementRenderNode = await getRenderTree(simpleFixture.answers[1]);
    expect(renderTree.children[0].nodeType).toBe(NodeType.ELEMENT_NODE)
    expect(renderTree.children[0].tagName).toBe('DIV');
    expect((renderTree.children[0] as IElementRenderNode).style.width).toBe('50px');
  });
});

describe(ulFixture.title, () => {
  test(ulFixture.question.name, async () => {
    const renderTree: IElementRenderNode = await getRenderTree(ulFixture.question);
    expect(renderTree.children[0].nodeType).toBe(NodeType.ELEMENT_NODE)
    expect(renderTree.children[0].tagName).toBe('UL');
    expect((renderTree.children[0].children[4]).tagName).toBe('LI');
  });

  // has extra child
  test(ulFixture.answers[0].name, async () => {
    const renderTree: IElementRenderNode = await getRenderTree(ulFixture.answers[0]);
    expect(renderTree.children[0].nodeType).toBe(NodeType.ELEMENT_NODE)
    expect(renderTree.children[0].tagName).toBe('UL');
    expect((renderTree.children[0].children[5]).tagName).toBe('LI');
    expect((renderTree.children[0].children[0].children[0] as TextRenderNode).text).toBe('Cras justo odio');
  });
});
