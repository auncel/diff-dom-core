import { Puppeteer } from './Puppeteer';
import { AssertionError } from 'assert';

it('get pageManger', (done) => {
  Puppeteer.getPageManager()
    .then((pageManager) => {
      expect(pageManager).not.toBeNull();
      done();
    });
});
