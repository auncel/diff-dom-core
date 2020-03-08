/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-underscore-dangle */


exports.__esModule = true;
const fs = require('fs');
const path_1 = require('path');
const YAML = require('js-yaml');

const SPLITTER = '<!-- splitter -->';
function readFixture(filepath) {
  if (!fs.existsSync(filepath)) {
    throw Error(`file ${filepath} dosen't exist!`);
  }
  const htmlContent = fs.readFileSync(filepath, { encoding: 'utf8' });
  const commentEndIdx = htmlContent.indexOf('-->');
  const yamlText = htmlContent.substring(4, commentEndIdx).trim();
  const splitterIdx = htmlContent.indexOf(SPLITTER);
  const stylesheet = htmlContent.substring(commentEndIdx + 3, splitterIdx).trim().slice(7, -8).trim();
  const fragment = htmlContent.substring(splitterIdx + SPLITTER.length).trim();
  const relativePaths = path_1.relative(__dirname, filepath).split('/');
  const filename = relativePaths.pop();
  const _a = YAML.load(yamlText); const description = _a.description; const
    similarity = _a.similarity;
  const _b = filename.split('.'); const typeName = _b[0]; const
    type = _b[1];
  relativePaths.push(typeName);
  const name = `${type}: ${relativePaths.join(' -> ')}`;
  return {
    name,
    description,
    similarity,
    type,
    fragment,
    stylesheet,
  };
}
exports.readFixture = readFixture;
function readFixtures(dirpath) {
  if (!fs.statSync(dirpath).isDirectory) {
    throw Error(`${dirpath} must be Directory`);
  }
  const fixtureObject = { title: '', question: null, answers: [] };
  fixtureObject.title = path_1.relative(__dirname, dirpath).split('/').join(' -> ');
  const filenames = fs.readdirSync(dirpath);
  filenames.sort(); // 字母排序
  // eslint-disable-next-line no-restricted-syntax
  for (let _i = 0, filenames_1 = filenames; _i < filenames_1.length; _i++) {
    const filename = filenames_1[_i];
    const fixtureData = readFixture(path_1.join(dirpath, filename));
    if (fixtureData.type === 'question') {
      fixtureObject.question = fixtureData;
    } else {
      fixtureObject.answers.push(fixtureData);
    }
  }
  return fixtureObject;
}
exports.readFixtures = readFixtures;
function readAllFixtures() {
  const fixtrueMap = new Map();
  function dirRecursion(dirpath) {
    if (fs.statSync(dirpath).isDirectory) {
      const dirfiles = fs.readdirSync(dirpath, { withFileTypes: true });
      // eslint-disable-next-line no-restricted-syntax
      for (let _i = 0, dirfiles_1 = dirfiles; _i < dirfiles_1.length; _i++) {
        const dirfile = dirfiles_1[_i];
        if (dirfile.isFile() && dirfile.name.endsWith('.html')) {
          const fixtrue = readFixtures(dirpath);
          fixtrueMap.set(fixtrue.title, fixtrue);
          break;
        } else if (dirfile.isDirectory()) {
          dirRecursion(path_1.join(dirpath, dirfile.name));
        }
      }
    }
  }
  dirRecursion(__dirname);
  return fixtrueMap;
}
exports.readAllFixtures = readAllFixtures;
