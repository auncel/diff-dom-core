import { tags, AttributeList } from '../const/tag';
export declare type TTag = typeof tags[number];
export declare type TTagAttribute = typeof AttributeList[number];
export declare type TAttributes = Partial<Record<TTagAttribute, string>>;
