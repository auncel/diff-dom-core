import { IRenderNode } from '@surpass/common/types/domCore';
import { TTag } from '@surpass/common/types/element';
export declare function createEmptyNode(tagName?: TTag): IRenderNode;
export declare function createTextNode(text?: string): IRenderNode;
export declare function isElement(elem: IRenderNode): boolean;
export declare function createHTMLTpl(fragment: string, stylesheet: string): string;
