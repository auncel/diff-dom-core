import { CSSProperties, PseudoClass } from '../const/css';

export type TCSSProperty = typeof CSSProperties[number];

export type TPseudoClass = typeof PseudoClass[number];

export type TStyleProps = Partial<Record<TCSSProperty, string>>;
