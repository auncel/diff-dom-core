
import { TTag } from '../RenderNode/element';
import { USER_STYLE_ID } from './const';
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';
import { IRenderNode } from '../RenderNode/RenderNode';
import { NodeType } from '../RenderNode/enum';

/**
 * 创建空的 RenderNode
 *
 * @export
 * @param {string} [tagName='div']
 * @returns {IRenderNode}
 */
export function createEmptyNode(tagName: TTag = 'div'): ElementRenderNode {
  return new ElementRenderNode(tagName);
}

export function createTextNode(text = ''): TextRenderNode {
  return new TextRenderNode(text);
}

export function isElement(elem: IRenderNode): boolean {
  return elem.nodeType === NodeType.ELEMENT_NODE;
}

/**
 * 返回完整的 HTML 字符串
 * @param fragment HTML 片段
 * @param stylesheet css 片段
 */
export function createHTMLTpl(fragment: string, stylesheet: string): string {
  // 数组更美观
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <meta http-equiv="X-UA-Compatible" content="ie=edge">',
    '  <title>Document</title>',
    '  <link href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css" rel="stylesheet">',
    `  <style id="${USER_STYLE_ID}">`,
    `    ${stylesheet}`,
    '  </style>',
    '</head>',
    '<body>',
    `    ${fragment}`,
    '</body>',
    '</html>'].join('\n');
}


export * from './traverse';
export * from './config';
