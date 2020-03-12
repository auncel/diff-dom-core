// /* --------------------------------------------------------------------------*
//  * Description:                                                              *
//  *                                                                           *
//  * File Created: Monday, 23rd December 2019 10:49 pm                         *
//  * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
//  *                                                                           *
//  * Last Modified: Monday, 23rd December 2019 10:49 pm                        *
//  * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
//  *                                                                           *
//  * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
//  *-------------------------------------------------------------------------- */
// /* eslint-disable no-param-reassign */
// import md5 from 'md5';
// import { IRenderNode, IDiffNode, NodeType, DiffType } from '../../lib/RenderNode/domCore';
// import { TAttributes } from '../../lib/RenderNode/element';
// import { strictEqualDiff } from '../stricly-equal/index';
// import getLeafs from './getLeafs';
// import hashing from './hashing';

// // function insert() {}
// // function delete() {}
// // function update() {}

// interface IEditScript {
//   action: string;
//   payload: IRenderNode;
// }

// interface IDeleteScript extends IEditScript {
//   action: 'delete';
// }

// interface IUpdateScript extends IEditScript {
//   action: 'update';
// }

// interface IInsertScript extends IEditScript {
//   action: 'insert';
// }

// type TScriptNode = IDeleteScript | IUpdateScript | IInsertScript;

// /**
//  *
//  * @param leftRootNode
//  * @param rightRootNode
//  */

// // eslint-disable-next-line consistent-return
// export function xDiff(leftRootNode: IRenderNode, rightRootNode: IRenderNode): IDiffNode {
//   hashing(leftRootNode);
//   hashing(rightRootNode);

//   if (leftRootNode.xHash === rightRootNode.xHash) {
//     return strictEqualDiff(leftRootNode, rightRootNode);
//   }
//   // 找出节点中 xHash 值 相同的
//   const leftSubNode = leftRootNode.children.filter((child1): boolean =>
//     // right tree 没有 xHash 相同的子节点
//     rightRootNode.children.every(child2 => child1.xHash !== child2.xHash),
//   );

//   const rightSubNode = rightRootNode.children.filter((child2): boolean =>
//     leftRootNode.children.every(child1 => child1.xHash !== child2.xHash),
//   );

//   const leftLeafList = getLeafs(leftSubNode);
//   const rightLeafList = getLeafs(rightSubNode);
//   const distaceTable = new Map<IRenderNode, IRenderNode>();

//   do {
//     const matchedList = [];
//     for (let lIdx = 0; lIdx < leftLeafList.length; lIdx++) {
//       const leftLeaf = leftLeafList[lIdx];
//       for (let rIdx = 0; rIdx < rightLeafList.length; rIdx++) {
//         const rightLeaf = rightLeafList[rIdx];
//         if (leftLeaf.xHash === rightLeaf.xHash) {
//           matchedList.push([lIdx, rIdx]);
//           distaceTable.set(rightLeaf, leftLeaf);
//         }
//       }
//     }

//     // 没有匹配对，结束
//     if (matchedList.length === 0) break;

//     matchedList.forEach(([lIdx, rIdx]) => {
//       const leftLeaf = leftLeafList[lIdx];
//       const rightLeaf = rightLeafList[rIdx];

//       if (leftSubNode.includes(leftLeaf)
//         || leftLeafList.includes(leftLeaf.parent)) {
//         leftLeafList.splice(lIdx, 1);
//       } else {
//         leftLeafList[lIdx] = leftLeaf.parent;
//       }

//       if (rightSubNode.includes(rightLeaf)
//         || rightLeafList.includes(rightLeaf.parent)) {
//         rightLeafList.splice(rIdx, 1);
//       } else {
//         rightLeafList[rIdx] = rightLeafList[rIdx].parent;
//       }
//     });
//   } while (leftLeafList.length && rightLeafList.length);

//   const editScript: TScriptNode[] = [];
//   // delete remain leftSubNode
//   leftSubNode.forEach((node) => {
//     editScript.push({
//       action: 'delete',
//       payload: node,
//     });
//   });
//   // delete remain leftSubNode
//   rightSubNode.forEach((node) => {
//     editScript.push({
//       action: 'insert',
//       payload: node,
//     });
//   });

//   editScript.forEach((script) => {
//     if (script.action === 'delete') {
//       script.payload.nodeDiffType = DiffType.NodeDELETE;
//     } else if (script.action === 'insert') {

//     }
//   });
// }

