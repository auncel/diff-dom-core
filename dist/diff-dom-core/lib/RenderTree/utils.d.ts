import { TNodeRect } from '@surpass/common/types/domCore';
import { TAttributes } from '@surpass/common/types/element';
export declare function getUuid(node: Element): string;
export declare function getStyle(node: Element): TAttributes;
export declare function getAttrs(node: Element): TAttributes;
export declare function getRect(node: Element, coordinate: {
    x: number;
    y: number;
}): TNodeRect;
