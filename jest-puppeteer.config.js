module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    defaultViewport: {
      width: 1519, // base on my computer: acer Aspire VX15
      height: 824,
    },
    headless: true,
  },
  // browser: 'chromium',
  // browserContext: 'default',
};
