const { program } = require('commander');
const fs = require('fs');
const generateRenderTree = require('./render-tree');

program
  .option('-s, --stylesheet', 'stylesheep', '')
  .option('-o, --output', 'output file path')
  .parse(process.argv);

const pkgs = program.args;

generateRenderTree({
  fragment: pkgs[0], stylesheet: program.stylesheet,
})
  .then((renderTree) => {
    if (program.output) {
      fs.writeFileSync(program.output, JSON.stringify(renderTree, null, 2));
    } else {
      console.log(JSON.stringify(renderTree, null, 2));
    }
  })
  .catch(console.error)
  .finally(() => process.exit(0));
