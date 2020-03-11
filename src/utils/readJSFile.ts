import * as fs from 'fs';
import * as path from 'path';

const fsp = fs.promises;

const cache = new Map<string, string>();

export function readJSFile(filepath: string): Promise<string> {
  let ext = path.extname(filepath);
  if (ext === '') {
    filepath = `${filepath}.js`;
    ext = '.js';
  }

  if (ext === '.js') {
    if (!fs.existsSync(filepath)) {
      throw Error(`${filepath} does not exist!`);
    }
    console.log(`read JavaScript from ${filepath}`);
    if (cache.has(filepath)) {
      return Promise.resolve(cache.get(filepath));
    }
    return fsp.readFile(filepath).then((buff) => {
      const srcCode = buff.toString();
      cache.set(filepath, srcCode);
      return srcCode;
    });
  }
  throw Error('not JavaScript file');
}
