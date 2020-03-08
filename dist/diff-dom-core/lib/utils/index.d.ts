import { IRenderNode } from '../renderNode/domCore';
import { TTag } from '../renderNode/element';
import ElementRenderNode from '../renderNode/ElementRenderNode';
import TextRenderNode from '../renderNode/TextRenderNode';
export declare function createEmptyNode(tagName?: TTag): ElementRenderNode;
export declare function createTextNode(text?: string): TextRenderNode;
export declare function isElement(elem: IRenderNode): boolean;
export declare function createHTMLTpl(fragment: string, stylesheet: string): string;
