// /* --------------------------------------------------------------------------*
//  * Description:                                                              *
//  *                                                                           *
//  * File Created: Tuesday, 24th December 2019 9:25 pm                         *
//  * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
//  *                                                                           *
//  * Last Modified: Tuesday, 24th December 2019 9:25 pm                        *
//  * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
//  *                                                                           *
//  * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
//  *-------------------------------------------------------------------------- */
// import { IRenderNode, NodeType } from 'lib/renderNode/domCore';
// import { cloneDeep } from 'lodash';
// import { hashing } from './hashing';

// const renderNode: IRenderNode = {
//   tagName: 'div',
//   nodeType: NodeType.ELEMENT_NODE,
//   attr: {
//     label: 'bar',
//   },
//   children: [
//     {
//       nodeType: NodeType.TEXT_NODE,
//       text: 'long long test',
//     },
//     {
//       nodeType: NodeType.ELEMENT_NODE,
//       tagName: 'span',
//       attr: {},
//       children: [],
//     },
//   ],
// };

// describe('render tree hashing', () => {
//   test('the same render node', () => {
//     const node1 = cloneDeep(renderNode);
//     const node2 = cloneDeep(renderNode);
//     hashing(node1);
//     hashing(node2);
//     expect(node1.xHash).toBe(node2.xHash);
//   });

//   test('chidren not the same', () => {
//     const node1 = cloneDeep(renderNode);
//     node1.children[0].text = 'anthor long text';
//     const node2 = cloneDeep(renderNode);
//     hashing(node1);
//     hashing(node2);
//     expect(node1.xHash).not.toBe(node2.xHash);
//     expect(node1.children[1].xHash).toBe(node2.children[1].xHash);
//   });

//   test('root node tag not the same', () => {
//     const node1 = cloneDeep(renderNode);
//     node1.tagName = 'section';
//     const node2 = cloneDeep(renderNode);
//     hashing(node1);
//     hashing(node2);
//     expect(node1.xHash).not.toBe(node2.xHash);
//     expect(node1.children[0].xHash).toBe(node2.children[0].xHash);
//     expect(node1.children[1].xHash).toBe(node2.children[1].xHash);
//   });
// });
