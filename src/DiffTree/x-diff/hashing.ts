/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th December 2019 9:24 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th December 2019 9:24 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
import md5 from 'md5';
import { IRenderNode, NodeType } from '../../RenderNode/domCore';
// import { TAttributes } from '../../lib/types/element';

// function attrs2String(attrs: TAttributes): string {
//   return attrs ? Object
//     .keys(attrs)
//     .map(key => `${key}="${attrs[key]}"`)
//     .join(' ') : '';
// }

/**
 * 1. 添加 xHash 值
 * 2. 添加 parent 指针
 *
 * @export
 * @param {IRenderNode} node
 */
export function hashing(node: IRenderNode): void {
  const fragementCache = new Map<string, string>();
  function renderNode2HTML(node: IRenderNode): string {
    if (node.nodeType === NodeType.ELEMENT_NODE) {
      if (fragementCache.has(node.uuid!)) {
        return fragementCache.get(node.uuid!)!;
      }
      const fragement = [
        // 暂不加入 attribute，x-diff 只是 diff dom 结构
        `<${node.tagName}>`, // ${attrs2String(node.attr)}
        `${node.children.map(child => renderNode2HTML(child)).join('')}`,
        `</${node.tagName}>`,
      ].join('');
      fragementCache.set(node.uuid!, fragement);
      return fragement;
    } else if (node.nodeType === NodeType.TEXT_NODE) {
      return node.text ?? '';
    }
    return '';
  }

  // eslint-disable-next-line no-unused-expressions
  node.children?.forEach((child): void => {
    child.parent = node;
    hashing(child);
  });

  const fragement = renderNode2HTML(node);
  node.xHash = md5(fragement);
}

export default hashing;
