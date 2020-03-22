#!/bin/ent node
const { program } = require('commander');

const fs = require('fs');
const path = require('path');
const generateRenderTree = require('./render-tree');

program.version(require('../package.json').version);

program
  .command('html <html>', 'input html fixture file path')
  .command('fragment <fragment>', 'html snippet')
  .command('template <dirname> [quetion-name] [answer-name...]', 'genreate fixture templates')
  .parse(process.argv);
