/** 
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 10:27 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 10:27 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { getAttrs, getRect, getCssValue, getDisplayRate } from './utils';

describe('RenderTree/utils', () => {
  test('if getAttrs() ignore id,className,style and data-*', () => {
    document.body.innerHTML = `<div
    id="div" class="div" style="color: red;" data-name="a-oh~" checked title="div title"
  >DIV</div>`
  
    const attrObj = getAttrs(document.querySelector('div')!);
    expect(attrObj).toEqual({
      checked: true,
      title: 'div title',
    });
  });

  test('if getRect work when a div is located {x: 30, y: 40px} relative parent div',() => {
    document.body.style.margin = '0';
    document.body.innerHTML = `
    <div style="margin: 10px;position: absolute;">
      <div style="margin: 30px 40px; width: 30px; height: 20px">
        DIV
      </div>
    </div>`;
    const innerDiv = document.querySelector('div div')!;
    // NOTE: jsdom not Implement a layout engine 
    innerDiv.getBoundingClientRect = function () {
      return {
        "x": 50,
        "y": 40,
        "width": 30,
        "height": 20,
        "left": 50,
        "top": 40,
        "right": 80,
        "bottom": 60,
      } as DOMRect;
    };
    const rect = getRect(document.querySelector('div div')!,
     {x: 10, y: 10});
    expect(rect).toEqual({
      x: 50,
      y: 40, 
      top: 30,
      left: 40,
      width: 30,
      height: 20,
    });
  });

  
  test('if getCssValue(divElement, \'width\') returen 100px', () => {
    document.body.innerHTML = `<div style="width: 100px;"></div>`;
    expect(getCssValue(document.querySelector('div')!, 'width')).toBe('100px');
  });

  test('if getDisplayRate work', () => {
    document.body.innerHTML = `<div style="width: 100px; height: 100px;"></div>`;

    document.elementFromPoint = function(x, y) {
      if (x < 100 && y < 100) {
        return document.querySelector('div')!;
      }
      return null;
    };

    const displayRate = getDisplayRate(document.querySelector('div')!, {x: 0, y: 0, width: 100, height: 100, top: 0, left: 0}, 5);
    expect(displayRate).toBeGreaterThan(99);
  });
});