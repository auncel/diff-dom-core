import { Puppeteer } from './Puppeteer';
jest.setTimeout(30000);

it('get pageManger', async () => {
  const pageManager = await Puppeteer.getPageManager({ poolSize: 10 });
  expect(pageManager).not.toBeNull();
  await Puppeteer.close();
});
