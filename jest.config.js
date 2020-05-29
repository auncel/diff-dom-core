
const merge = require('merge');
const ts_preset = require('ts-jest/jest-preset');
const puppeteer_preset = require('jest-puppeteer/jest-preset');

module.exports = merge.recursive(
  ts_preset,
  puppeteer_preset,
  {
    testSequencer: './test/CustomSequencer.js',
    reporters: [
      'default',
      ['./node_modules/jest-html-reporter', {
        pageTitle: 'Auncel Diff DOM Core Report',
      }],
    ],
  },
);
