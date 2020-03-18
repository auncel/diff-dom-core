/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th December 2019 5:03 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th December 2019 5:03 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { IRenderNode, NodeType } from '../../RenderNode/domCore';
import { cloneDeep } from 'lodash';
import { xDiff } from './index';

describe('x-diff algorithm', () => {
  test('node', () => {
    /*
      <div>
        <div>
          <div></div>
          long text
        </div>
      </div>
    */
    const T1: IRenderNode = {
      nodeType: NodeType.ELEMENT_NODE,
      tagName: 'div',
      uuid: '1',
      children: [
        {
          nodeType: NodeType.ELEMENT_NODE,
          tagName: 'div',
          uuid: '2',
          children: [
            {
              nodeType: NodeType.ELEMENT_NODE,
              tagName: 'div',
              uuid: '3',
              children: [],
            },
            {
              nodeType: NodeType.TEXT_NODE,
              uuid: '4',
              text: 'long text',
            },
          ],
        },
      ],
    };
    /*
      <div>
        <div>
          <div>
            <div></div>
            long text
          </div>
        </div>
      </div>
    */
    const T2: IRenderNode = {
      nodeType: NodeType.ELEMENT_NODE,
      tagName: 'div',
      uuid: 'a',
      children: [
        {
          nodeType: NodeType.ELEMENT_NODE,
          tagName: 'div',
          uuid: 'b',
          children: [
            {
              nodeType: NodeType.ELEMENT_NODE,
              tagName: 'div',
              uuid: 'c',
              children: [
                {
                  nodeType: NodeType.ELEMENT_NODE,
                  tagName: 'div',
                  uuid: 'd',
                  children: [],
                },
                {
                  nodeType: NodeType.TEXT_NODE,
                  uuid: 'e',
                  text: 'long text',
                },
              ],
            },
          ],
        },
      ],
    };

    xDiff(T1, T2);
  });

  test('node', () => {
    /*
      <div>
        <div>
          <div></div>
          long text
        </div>
      </div>
    */
    const T1: IRenderNode = {
      nodeType: NodeType.ELEMENT_NODE,
      tagName: 'div',
      uuid: '1',
      children: [
        {
          nodeType: NodeType.ELEMENT_NODE,
          tagName: 'div',
          uuid: '2',
          children: [
            {
              nodeType: NodeType.ELEMENT_NODE,
              tagName: 'div',
              uuid: '3',
              children: [],
            },
            {
              nodeType: NodeType.TEXT_NODE,
              uuid: '4',
              text: 'long text',
            },
          ],
        },
      ],
    };
    /*
      <div>
        <div>
          <span></span>
          long text
        </div>
      </div>
    */
    const T2 = cloneDeep(T1);
    T2.children[0].children[0].tagName = 'span';
    xDiff(T1, T2);
  });
});
