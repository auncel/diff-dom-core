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

export async function getRenderTree(data: IElementRenderNode | IHTMLSnippet): Promise<IElementRenderNode> {
  // @url https://jkchao.github.io/typescript-book-chinese/typings/typeGuard.html#in
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if ('html' in data) {
    const html = createHTMLTpl(data.html, data.style);
    const renderTree = await pptrGenerateRenderTree(html);
    return renderTree;
  }
  return data;
}

export async function diffDomCore(
  question: IElementRenderNode | IHTMLSnippet,
  answer: IElementRenderNode | IHTMLSnippet,
  options?: IDomDiffCoreOption,
): Promise<IDiffResult> {
  setConfig('generation', options?.generation ?? {});
  setConfig('diff', options?.diff ?? {});
  setConfig('evaluation', options?.evaluation ?? {});

  let evaluateResult: IDiffResult = { score: 0, logs: [] };

  const [questionRenderTree, answerRenerTree] = await Promise.all([
    getRenderTree(question),
    getRenderTree(answer),
  ]);

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
