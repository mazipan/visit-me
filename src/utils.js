const puppeteer = require('puppeteer');

/**
 * @param {boolean} headless
 * @return {object} { browser, browserPage }
 */
exports.createBrowser = async function createBrowser(headless) {
  const browser = await puppeteer.launch({ headless });

  const browserPage = await browser.newPage();
  await browserPage.setViewport({ width: 1920, height: 926 });
  return { browser, browserPage };
};
