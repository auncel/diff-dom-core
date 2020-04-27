/* --------------------------------------------------------------------------*
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
/* --------------------------------------------------------------------------*
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
import './types';
// import '@auncel/common/polyfill/toJSON';
import { createHTMLTpl, setConfig } from './utils';
import { IHTMLSnippet } from './HTMLSnippet.interface';
import { fixedScoringPointGenerateDiffResult, IDiffLog, IDiffResult, IGenerateDiffResultOption } from './evaluateSimilarity';
import { xTreeDiffPlustGenerateDiffTree } from './DiffTree/xTreeDiffPlusGenerateDiffTree';
import { ElementRenderNode, IElementRenderNode, TextRenderNode, ITextRenderNode, IRenderNode } from './RenderNode';
import { plainObject2RenderNode } from './DiffTree/x-tree-diff-plus/plainObject2RenderNode';
import './pptr/startup';
import { pptrGenerateRenderTree } from './RenderTree/pptrGenerateRenderTree';
import { IDomDiffCoreOption } from './config';

export async function diffDomCore(
  question: IElementRenderNode | IHTMLSnippet, answer: IHTMLSnippet, options?: IDomDiffCoreOption,
): Promise<IDiffResult> {
  const answerHtml = createHTMLTpl(answer.html, answer.style);

  setConfig('generation', options?.generation ?? {});
  setConfig('diff', options?.diff ?? {});
  setConfig('evaluation', options?.evaluation ?? {});

  let evaluateResult: IDiffResult = { score: 0, logs: [] };
  let answerRenerTree: IElementRenderNode;
  let questionRenderTree: IElementRenderNode;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if (typeof (<IElementRenderNode>question).nodeType !== 'undefined') {
    answerRenerTree = await pptrGenerateRenderTree(answerHtml);
    questionRenderTree = question as IElementRenderNode;
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
  const diffTree = xTreeDiffPlustGenerateDiffTree(
    plainObject2RenderNode(questionRenderTree!),
    plainObject2RenderNode(answerRenerTree!),
  );
  evaluateResult = fixedScoringPointGenerateDiffResult(diffTree);
  return evaluateResult;
}

export { Puppeteer } from './pptr';
export * from './exceptions';
export {
  IHTMLSnippet,
  IDomDiffCoreOption,
  ElementRenderNode,
  TextRenderNode, ITextRenderNode, IRenderNode,
  IDiffLog, IDiffResult, IGenerateDiffResultOption,
};
