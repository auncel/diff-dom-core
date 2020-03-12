#!/bin/ent node
const args = require('args');
const fs = require('fs');
const path = require('path');
const generateRenderTree = require('./render-tree');

function isDefine(val) {
  return typeof val !== 'undefined';
}

require('../../common/dist/polyfill/toJSON');

args
  .option('html', 'input html fixture file path')
  .option('output', 'output file')
  .option('fragment', 'html snippet')
  .option('stylesheet', 'css snippet');

const config = args.parse(process.argv);

if (isDefine(config.html)) {
  const htmlFilePath = path.join(process.cwd(), config.html);
  if (fs.existsSync(htmlFilePath)) {
    generateRenderTree(htmlFilePath)
      .then((renderTree) => {
        if (config.output) {
          fs.writeFileSync(config.output, JSON.stringify(renderTree, null, 2));
        } else {
          console.log(JSON.stringify(renderTree, null, 2));
        }
      })
      .catch(console.error)
      .finally(() => process.exit(0));
  } else {
    throw new Error(`file ${config.html} donsen't exist!`);
  }
} else if (isDefine(config.fragment)) {
  const { fragment, stylesheet = '' } = config;
  generateRenderTree({ fragment, stylesheet })
    .then((renderTree) => {
      if (config.output) {
        fs.writeFileSync(config.output, JSON.stringify(renderTree, null, 2));
      } else {
        console.log(JSON.stringify(renderTree, null, 2));
      }
    })
    .catch(console.error)
    .finally(() => process.exit(0));
}

// generateRenderTree(`
//   <div></div>
// `, 'div { color: red; } ');
