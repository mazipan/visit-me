const ora = require('ora');
const chalk = require('chalk');
const { createBrowser } = require('./utils');

/**
 * @param {number} count
 * @param {string} url
 * @param {boolean} headless
 */
exports.visit = async function visit({ count, url, headless }) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1);
  }

  // Using for - of, for better async-await support
  for (const idx of arr) {
    const spinner = ora(`${idx + 1}. Visiting ${url}...`).start();
    const { browser, browserPage } = await createBrowser(headless);
    try {
      await browserPage.goto(url, { waitUntil: 'networkidle2' });
      await browserPage.evaluate(() => {});
    } catch (error) {
			console.error(chalk.red(`visit got error: `), error);
    }
    spinner.stop();
    await browser.close();
  }
};
