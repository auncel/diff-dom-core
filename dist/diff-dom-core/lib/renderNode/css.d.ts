import { CSSProperties, PseudoClass } from '../const/css';
export declare type TCSSProperty = typeof CSSProperties[number];
export declare type TPseudoClass = typeof PseudoClass[number];
export declare type TStyleProps = Partial<Record<TCSSProperty, string>>;
