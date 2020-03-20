const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const generateRenderTree = require('./render-tree');

program
  .option('-o, --output', 'output file path')
  .parse(process.argv);

const pkgs = program.args;
const htmlFilePath = path.join(process.cwd(), pkgs[0]);

if (fs.existsSync(htmlFilePath)) {
  generateRenderTree(htmlFilePath)
    .then((renderTree) => {
      if (program.output) {
        fs.writeFileSync(program.output, JSON.stringify(renderTree, null, 2));
      } else {
        console.log(JSON.stringify(renderTree, null, 2));
      }
    })
    .catch(console.error)
    .finally(() => process.exit(0));
} else {
  throw new Error(`file ${pkgs[0]} donsen't exist!`);
}
