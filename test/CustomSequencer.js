/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 17th March 2020 4:39 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 17th March 2020 4:39 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
  sort(tests) {
    const orderPath = [
      'utils',
      'pptr',
      'RenderNode',
      'CSSTree',
      'RenderTree',
      'DiffTree',
      'evaluateSimilarity',
    ].map(path => 'src/' + path);

    return tests.sort((testA, testB) => {
      const indexA = orderPath.findIndex(path => testA.path.indexOf(path) !== -1);
      const indexB = orderPath.findIndex(path => testB.path.indexOf(path) !== -1);

      // do not swap when tests both not specify in order.
      if (indexA === indexB) return 0;

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA < indexB ? -1 : 1;
    });
  }
}

module.exports = CustomSequencer;