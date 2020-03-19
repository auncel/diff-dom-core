/*--------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 12:40 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 10:01 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/*eslint spaced-comment: ["error", "never"]*/
//eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./global.d.ts" />

//import '@auncel/common/polyfill/toJSON';
import { IDiffResult } from './evaluateSimilarity/generateDiffResult.interface';
import { createHTMLTpl } from './utils';
import { IHTMLSnippet } from './HTMLSnippet.interface';
import { fixedScoringPointGenerateDiffResult } from './evaluateSimilarity';
import { xTreeDiffPlustGenerateDiffTree } from './DiffTree/xTreeDiffPlusGenerateDiffTree';
import ElementRenderNode, { IElementRenderNode } from './RenderNode/ElementRenderNode';
import { plainObject2RenderNode } from './DiffTree/x-tree-diff-plus/plainObject2RenderNode';
import './pptr/startup';
import { pptrGenerateRenderTree } from './RenderTree/pptrGenerateRenderTree';

export async function diffDomCore(
  question: IElementRenderNode | IHTMLSnippet, answer: IHTMLSnippet,
): Promise<IDiffResult> {
  const answerHtml = createHTMLTpl(answer.html, answer.style);

  let evaluateResult: IDiffResult = { score: 0, logs: [] };
  let answerRenerTree: ElementRenderNode;
  let questionRenderTree: ElementRenderNode;
  //eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if (typeof (<IElementRenderNode>question).nodeType !== 'undefined') {
    answerRenerTree = await pptrGenerateRenderTree(answerHtml);
    questionRenderTree = plainObject2RenderNode(question as IElementRenderNode);
  } else {
    const questionHtml = createHTMLTpl(
      (question as IHTMLSnippet).html,
      (question as IHTMLSnippet).style,
    );
    [questionRenderTree, answerRenerTree] = await Promise.all([
      pptrGenerateRenderTree(answerHtml),
      pptrGenerateRenderTree(questionHtml),
    ]);
  }
  const diffTree = xTreeDiffPlustGenerateDiffTree(questionRenderTree!, answerRenerTree!);
  evaluateResult = fixedScoringPointGenerateDiffResult(diffTree);
  return evaluateResult;
}
