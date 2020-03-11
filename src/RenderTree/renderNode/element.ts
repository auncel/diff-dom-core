import { tags, AttributeList } from '../const/tag';

export type TTag = typeof tags[number];

export type TTagAttribute = typeof AttributeList[number];

export type TAttributes = Partial<Record<TTagAttribute, string>>;
