/* --------------------------------------------------------------------------*
 * Description: 解析 CSS 字符串，返回选择器为 key，属性值为 value 的 Map       *
 *                                                                           *
 * File Created: Friday, 29th November 2019 9:32 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 29th November 2019 9:32 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import * as CSSTree from 'css-tree';
import CSSShorthandProperties from '../RenderTree/CSSShorthandProperties';

/**
 * @param text CSS 字符串
 */
export function parseCSS(text): Map<string, Set<string>> {
  const ast = CSSTree.parse(text);
  const selectorMap = new Map<string, Set<string>>();
  // eslint-disable-next-line prefer-arrow-callback
  CSSTree.walk(ast, function astVisitor(node: CSSTree.CssNode): void {
    if (node.type === 'Rule') {
      const { prelude, block } = node;
      const properties = new Set<string>();
      block.children.forEach((declaration) => {
        if (declaration.type === 'Declaration') {
          if (CSSShorthandProperties[declaration.property]) {
            CSSShorthandProperties[declaration.property].forEach((property) => {
              properties.add(property);
            });
          } else {
            properties.add(declaration.property);
          }
        }
      });
      if (prelude.type === 'SelectorList') {
        // eslint-disable-next-line no-inner-declarations
        function getSelectorStr(prelude: CSSTree.SelectorList): string[] {
          const result: string[] = [];
          // NOTE: css tree 自己实现了一套数组方法，map 没用
          // TODO: 伪类
          prelude.children.forEach((selector) => {
            if (selector.type === 'Selector') {
              const { children } = selector;
              const selectors = [];
              children.forEach((s) => {
                switch (s.type) {
                  case 'TypeSelector':
                    selectors.push(s.name);
                    break;
                  case 'ClassSelector':
                    selectors.push(`.${s.name}`);
                    break;
                  case 'IdSelector':
                    selectors.push(`#${s.name}`);
                    break;
                  case 'WhiteSpace':
                    selectors.push(s.value);
                    break;
                  case 'AttributeSelector': {
                    let AttrSelector = `[${s.name.name}`;
                    if (s.matcher) {
                      AttrSelector += s.matcher;
                    }
                    if (s.value && s.value.type === 'String' && s.value.value) {
                      AttrSelector += s.value.value;
                    }
                    AttrSelector += ']';
                    selectors.push(AttrSelector);
                    break;
                  }
                  case 'PseudoClassSelector':
                    if (s.children) {
                      const nestSelectors = [];
                      s.children.forEach((cssNode) => {
                        if (cssNode.type === 'SelectorList') {
                          const nestSelector = getSelectorStr(cssNode);
                          nestSelectors.push(nestSelector.join(', '));
                        } else if (cssNode.type === 'Nth') {
                          const { nth } = cssNode;
                          if (nth.type === 'AnPlusB') {
                            if (typeof nth.a === 'string') {
                              nestSelectors.push(`${nth.a}n`);
                            }
                            if (typeof nth.b === 'string') {
                              const b = Number(nth.b); // 为了去掉 +1 的 + 号
                              nestSelectors.push(String(b > 0 ? `+${nth.b}` : nth.b));
                            }
                          }
                          nestSelectors.push();
                        }
                      });
                      selectors.push(`:${s.name}(${nestSelectors.join('')})`);
                    } else {
                      selectors.push(`:${s.name}`);
                    }
                    break;
                  case 'PseudoElementSelector':
                    selectors.push(`::${s.name}`);
                    break;
                  case 'Combinator':
                    selectors.push(` ${s.name} `);
                    break;
                  default:
                    selectors.push('');
                }
              });
              result.push(selectors.join(''));
            }
          });
          return result;
        }

        const selectors = getSelectorStr(prelude);
        selectors.forEach(selector => selectorMap.set(selector, properties));
      }
    }
  });
  return selectorMap;
}

