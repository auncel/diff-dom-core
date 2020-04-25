/*---------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 24th April 2020 10:18 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 24th April 2020 10:18 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

/*eslint spaced-comment: ["error", "never"]*/
//eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./global.d.ts" />

//import '@auncel/common/polyfill/toJSON';
import { IDiffResult } from './evaluateSimilarity/generateDiffResult.interface';
import { createHTMLTpl, setConfig, getConfig } from './utils';
import { IHTMLSnippet } from './HTMLSnippet.interface';
import { fixedScoringPointGenerateDiffResult } from './evaluateSimilarity';
import { xTreeDiffPlustGenerateDiffTree } from './DiffTree/xTreeDiffPlusGenerateDiffTree';
import ElementRenderNode, { IElementRenderNode } from './RenderNode/ElementRenderNode';
import { plainObject2RenderNode } from './DiffTree/x-tree-diff-plus/plainObject2RenderNode';
import './pptr/startup';
import { pptrGenerateRenderTree } from './RenderTree/pptrGenerateRenderTree';
import { IDomDiffCoreOption } from './config';
import { generateRenderTree } from './RenderTree';


export async function diffDomCore(
  question: IElementRenderNode | IHTMLSnippet, answer: IHTMLSnippet, options?: IDomDiffCoreOption,
): Promise<IDiffResult> {
  const answerHtml = createHTMLTpl(answer.html, answer.style);

  setConfig('generation', options?.generation ?? {});
  setConfig('diff', options?.diff ?? {});
  setConfig('evaluation', options?.evaluation ?? {});

  let evaluateResult: IDiffResult = { score: 0, logs: [] };
  let answerRenerTree: ElementRenderNode;
  let questionRenderTree: ElementRenderNode;
  //eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if (typeof (<IElementRenderNode>question).nodeType !== 'undefined') {
    //answerRenerTree = await pptrGenerateRenderTree(answerHtml);
    window.generateRenderTreeOptions = getConfig('generation');
    //TODO: need iframe implement
    answerRenerTree = generateRenderTree() as ElementRenderNode;
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
