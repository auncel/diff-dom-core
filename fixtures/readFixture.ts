import * as fs from 'fs';
import { join, relative, resolve } from 'path';
import * as YAML from 'js-yaml';

const SPLITTER = '<!-- splitter -->';

export interface IFixtureData {
  name: string;
  filename: string;
  description: string;
  similarity: number;
  type: string;
  fragment: string;
  stylesheet: string;
}

export interface IFixture {
  title: string;
  question: IFixtureData;
  answers: IFixtureData[];
}

/**
 * 解析 html 文件，返回 IFixtureData
 * html 文件需要遵循特殊格式
 *
 * @export
 * @param {string} filepath html 文件路径
 * @returns {IFixtureData}
 */
export function readFixture(filepath: string): IFixtureData {
  if (!fs.existsSync(filepath)) {
    throw Error(`file ${filepath} dosen't exist!`);
  }

  const htmlContent: string = fs.readFileSync(filepath, { encoding: 'utf8' });

  const commentEndIdx = htmlContent.indexOf('-->');
  const yamlText = htmlContent.substring(4, commentEndIdx).trim();
  const splitterIdx = htmlContent.indexOf(SPLITTER);
  const stylesheet = htmlContent.substring(commentEndIdx + 3, splitterIdx).trim().slice(7, -8).trim();
  const fragment = htmlContent.substring(splitterIdx + SPLITTER.length).trim();

  const relativePaths = relative(__dirname, filepath).split('/');
  const filename = relativePaths.pop()!;

  const { description, similarity }: { description: string; similarity: number} = YAML.load(yamlText);
  const [typeName, type] = filename.split('.');
  relativePaths.push(typeName);
  const name = `${type}: ${relativePaths.join(' -> ')}`;

  return {
    name,
    filename,
    description,
    similarity,
    type,
    fragment,
    stylesheet,
  };
}

/**
 * 读取指定目录下的所有 html fixture
 * 返回 IFixture
 *
 * @export
 * @param {string} dirpath html fixture 所在目录，相对与 fixtures/ 目录
 * @returns {IFixture}
 */
export function readFixtures(dirpath: string): IFixture {
  const absPath = resolve(__dirname, dirpath);
  if (fs.existsSync(absPath) && !fs.statSync(absPath).isDirectory) {
    throw Error(`${absPath} must be Directory`);
  }
  const fixtureObject: IFixture = {} as IFixture;
  fixtureObject.title = relative(__dirname, dirpath).split('/').join(' -> ');
  fixtureObject.answers = [];
  const filenames = fs.readdirSync(absPath);
  filenames.sort(); // 字母排序
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of filenames) {
    const fixtureData = readFixture(join(absPath, filename));
    if (fixtureData.type === 'question') {
      fixtureObject.question = fixtureData;
    } else {
      fixtureObject.answers.push(fixtureData);
    }
  }
  return fixtureObject;
}

/**
 * 解析 fixtures/ 目录下的所有子目录
 *
 * @export
 * @returns {Map<string, IFixture>} key 是表示文件路径
 */
export function readAllFixtures(): Map<string, IFixture> {
  const fixtrueMap = new Map<string, IFixture>();

  function dirRecursion(dirpath: string): void {
    if (fs.statSync(dirpath).isDirectory) {
      const dirfiles = fs.readdirSync(dirpath, { withFileTypes: true });
      // eslint-disable-next-line no-restricted-syntax
      for (const dirfile of dirfiles) {
        if (dirfile.isFile() && dirfile.name.endsWith('.html')) {
          const fixtrue = readFixtures(dirpath);
          fixtrueMap.set(fixtrue.title, fixtrue);
          break;
        } else if (dirfile.isDirectory()) {
          dirRecursion(join(dirpath, dirfile.name));
        }
      }
    }
  }

  dirRecursion(__dirname);

  return fixtrueMap;
}
