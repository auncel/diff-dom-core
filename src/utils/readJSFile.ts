import * as fs from 'fs';
import * as path from 'path';
import debug from 'debug';

const log = debug('auncel:dom:utils:readJSFile');

const fsp = fs.promises;

const cache = new Map<string, string>();

export function readJSFile(filepath: string): Promise<string> {
  log(`read js file from ${filepath}`);

  let ext = path.extname(filepath);
  if (ext === '') {
    filepath = `${filepath}.js`;
    ext = '.js';
  }

  if (ext === '.js') {
    if (!fs.existsSync(filepath)) {
      throw Error(`${filepath} does not exist!`);
    }
    if (cache.has(filepath)) {
      log('filepath hit catch');
      return Promise.resolve(cache.get(filepath)!);
    }
    return fsp.readFile(filepath).then((buff) => {
      const srcCode = buff.toString();
      cache.set(filepath, srcCode);
      log('success read JavaScript file');
      return srcCode;
    });
  }
  throw Error('not JavaScript file');
}
