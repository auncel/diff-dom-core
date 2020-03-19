# @auncel/diff-dom-core

Core HTML diff algorithm.

## Usage

Clone Repo.

```sh
git clone https://github.com/auncel/diff-dom-core.git
```

Install dependence.

```sh
npm install
```

> problem with install puppeteer. recommend using `cnpm` instead. see more detail at [troublesheet](./docs/troublesheet.md).

Building Typescript.

```sh
npm run build
```

Tesing

```sh
npm run test
```

### Exmaple

```ts
import { diffDomCore, Puppeteer } from '@auncel/diff-dom-core';

const diffRes = await diffDomCore(
  { html: '<div>Text</div>', style: 'div{color: #fff;}' },
  { html: '<div>Text</div>', style: 'div{color: #000;}' },
);
console.log(diffRes);
// ==>
// {
//   "score":80,
//   "logs":[
//     {
//       "location":"div",
//       "difference":[
//         "property incorrent. [color] expect: rgb(255, 255, 255), actual: rgb(0, 0, 0)"
//         ]
//       }
//   ]
// }

await Puppeteer.close();
```

## Dependency Package

+ [@dovyih/x-tree-diff-plus](https://github.com/yidafu/x-tree-diff-plus)
