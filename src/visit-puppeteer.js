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
	const hrstart = process.hrtime();

  // Using for - of, for better async-await support
  for (const idx of arr) {
    const spinner = ora(`${idx}. Visiting page ${url}`).start();
    const { browser, browserPage } = await createBrowser(headless);
    try {
      await browserPage.goto(url, { waitUntil: 'networkidle2' });
      await browserPage.evaluate(() => {});
			spinner.succeed(`${idx}. Success visiting ${url}`);
    } catch (error) {
			spinner.fail(`${idx}. Failed visiting ${url}`);
			console.error(chalk.red(`💥 We got error: `), error);
		}
    await browser.close();
	}

	console.info(chalk.greenBright(`\n🤩 Finish visiting the page!\n`));

	const hrend = process.hrtime(hrstart);
	console.info(chalk.blueBright(`Total execution time: ${hrend[0]}s`));
};
