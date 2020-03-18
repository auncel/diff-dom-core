/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th December 2019 10:59 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th December 2019 10:59 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import getLeafs from './getLeafs';
import { IRenderNode } from '../../RenderNode/RenderNode';
import { NodeType } from '../../RenderNode/enum';

describe('getLeafs', () => {
  test('a layer of nesting', () => {
    const node: IRenderNode = {
      nodeType: NodeType.ELEMENT_NODE,
      children: [{
        nodeType: NodeType.ELEMENT_NODE,
        uuid: '1',
        children: [],
      },
      {
        nodeType: NodeType.TEXT_NODE,
        text: 'long logn text 11',
      },
      ],
    };
    const leafs = getLeafs(Array(3).fill(node));
    expect(leafs.length).toBe(6);
  });


  test('Multilayer nested', () => {
    const node: IRenderNode = {
      nodeType: NodeType.ELEMENT_NODE,
      uuid: '1',
      children: [
        {
          nodeType: NodeType.ELEMENT_NODE,
          uuid: '2',
          children: [
            {
              nodeType: NodeType.ELEMENT_NODE,
              uuid: '3',
              children: [
                {
                  nodeType: NodeType.ELEMENT_NODE,
                  uuid: '4',
                  children: [],
                },
                {
                  nodeType: NodeType.ELEMENT_NODE,
                  uuid: '5',
                  children: [],
                },
              ],
            },
            {
              nodeType: NodeType.ELEMENT_NODE,
              uuid: '6',
              children: [
                {
                  nodeType: NodeType.ELEMENT_NODE,
                  uuid: '7',
                  children: [
                    {
                      nodeType: NodeType.TEXT_NODE,
                      text: 'long logn text 11',
                    },
                    {
                      nodeType: NodeType.ELEMENT_NODE,
                      uuid: '8',
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          nodeType: NodeType.TEXT_NODE,
          text: 'long logn text 22',
        },
      ],
    };
    const leafs = getLeafs([node]);
    console.log(leafs);
    expect(leafs.length).toBe(5);
  });
});
