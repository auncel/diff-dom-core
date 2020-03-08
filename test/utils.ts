/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Monday, 2nd December 2019 10:47 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Monday, 2nd December 2019 10:47 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0 License                  *
 *-------------------------------------------------------------------------- */

export function getSimpleData(): { fragment: string; stylesheet: string} {
  const fragment = `
<div class="listItem_listItem">
  <h1>
    <a class="text" href="/post/2019-05-08-separation-in-thousandth">数字表示成千位分隔形式的几种解法</a>
  </h1>
  <p>Wrote @ 2019-12-01</p>
</div>`;

  const stylesheet = `
.listItem_listItem {
  background-color: #fff;
  padding: 30px 50px;
  margin: 20px;
  box-shadow: 0 7px 7px 7px #eee;
  border-radius: 10px;
}

h1 {
  font-size: 32px;
}

h1 a {
  text-decoration: none;
}

.text {
  padding: 20px;
  color: #333;
}
div p {
  color: #aaa;
}`;
  return {
    fragment,
    stylesheet,
  };
}
