/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st March 2020 11:50 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st March 2020 11:50 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { typeOf, createEmptyNode, createTextNode } from './index'
import ElementRenderNode from '../RenderNode/ElementRenderNode';
import TextRenderNode from '../RenderNode/TextRenderNode';

describe('utils/typeOf', () => {
  test('should returen Object', () => {
    expect(typeOf({})).toBe('Object')
  });
  
  test('should returen Number', () => {
    expect(typeOf(233)).toBe('Number')
  });

  test('should returen String', () => {
    expect(typeOf('string')).toBe('String')
  });
  test('should returen Null', () => {
    expect(typeOf(null)).toBe('Null')
  });
  test('should returen Undefined', () => {
    expect(typeOf(undefined)).toBe('Undefined')
  });
  test('should returen Array', () => {
    expect(typeOf([1, 2, 3])).toBe('Array')
  });
  // test('should returen BigInt', () => {
  //   expect(typeOf(12345678900n)).toBe('BigInt')
  // });
  test('should returen Symbol', () => {
    expect(typeOf(Symbol())).toBe('Symbol')
  });
});


describe('utils create RenderNode', () => {
  test('if call createEmptyNode with default param', () => {
    const renderNode = createEmptyNode();
    expect(renderNode.tagName).toBe('div');
    expect(renderNode).toBeInstanceOf(ElementRenderNode);
  });

  test('if create input ElementRenderNode', () => {
    const renderNode = createEmptyNode('input');
    expect(renderNode.tagName).toBe('input');
    expect(renderNode).toBeInstanceOf(ElementRenderNode);
  });

  test('if create TextRenderNode', () => {
    const renderNode = createTextNode('text');
    expect(renderNode.tagName).toBe('#text');
    expect(renderNode).toBeInstanceOf(TextRenderNode);
  });
})