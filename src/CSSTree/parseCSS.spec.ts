/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 30th November 2019 2:09 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 30th November 2019 2:09 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */
import { parseCSS } from './parseCSS';

describe('simple selector', () => {
  test('.cls { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls']);
    expect(Array.from(map.get('.cls')!)).toEqual(['color']);
  });

  test('.cls div #id { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls div #id { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls div #id']);
  });

  test('.cls \\n div \\n #id { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls \n div \n #id { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls div #id']);
  });

  test('.cls .cls, #id div { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls .cls, #id div { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls .cls', '#id div']);
  });
});

describe('Universal selector', () => {
  test('* div, *#id', () => {
    const map: Map<string, Set<string>> = parseCSS('* div, *#id { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['* div', '*#id']);
  });
});

describe('Attribute selector', () => {
  test('[checked] { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('[checked] { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['[checked]']);
  });

  test('div[data*=\'test\'] { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('div[data*=\'test\'] { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['div[data*=\'test\']']);
  });
});

describe('Combinators', () => {
  test('div ~ div { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('div ~ div { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['div ~ div']);
  });
});


describe('Pseudo', () => {
  test('.cls:nth-child(4n) { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls:nth-child(4n) { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls:nth-child(4n)']);
  });


  test('.cls:not(:last-child) { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls:not(:last-child) { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls:not(:last-child)']);
  });

  test('.cls:not(div.cls, span.cls) { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls:not(div.cls, span.cls) { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls:not(div.cls, span.cls)']);
  });

  test('.cls:not(div:not(.red)) { color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('.cls:not(div:not(.red)) { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['.cls:not(div:not(.red))']);
  });

  test('p::first-line {color: #fff; }', () => {
    const map: Map<string, Set<string>> = parseCSS('p::first-line { color: #fff; }');
    expect(Array.from(map.keys())).toEqual(['p::first-line']);
  });
});
