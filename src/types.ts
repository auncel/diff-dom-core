/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 19th March 2020 9:47 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 19th March 2020 9:47 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { IPlainObject } from '@auncel/common/types/IPlainObject';
import { PageManager } from './pptr';

declare global {
  var pageManager: PageManager;
  var diffScript: string;

  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    generateRenderTreeOptions: IPlainObject<any>;
  }
}

export interface IEmpety {
  (): void;
}
