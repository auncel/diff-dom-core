const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .parse(process.argv);
const QUESTION_TEMPLATE = `<!--
description: 问题描述
similarity: 100
-->
<style>
  div {
  }
</style>

<!-- splitter -->

<div></div>
`;
const ANWSER_TEMPLATE = `<!--
description: 答案描述
similarity: 100
-->
<style>
  div {
  }
</style>

<!-- splitter -->

<div></div>
`;

const args = program.args;
fs.mkdirSync(args[0]);

const questionFilepath = path.resolve(process.cwd(), args[0], `${args[1] || args[0]}.question.html`);
fs.writeFileSync(questionFilepath, QUESTION_TEMPLATE);

let index = 2;
do {
  const anwserFilepath = path.resolve(process.cwd(), args[0], `${args[index] || args[0]}.answer.html`);
  fs.writeFileSync(anwserFilepath, ANWSER_TEMPLATE);
  index++;
} while (index < args.length);
