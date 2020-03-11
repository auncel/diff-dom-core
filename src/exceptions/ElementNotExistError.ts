/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Sunday, 8th December 2019 11:50 am                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Sunday, 8th December 2019 11:51 am                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 MIT License                                         *
 *-------------------------------------------------------------------------- */

export class ElementNotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ElementNotExistError';
  }
}
