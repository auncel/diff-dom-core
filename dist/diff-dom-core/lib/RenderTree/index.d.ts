import { IRenderNode } from '@surpass/common/types/domCore';
declare global {
    interface Window {
        elementPropertyMap: Map<string, Map<string, string>>;
    }
}
export declare function generateTree(): IRenderNode;
