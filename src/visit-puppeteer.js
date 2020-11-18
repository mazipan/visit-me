const ora = require('ora');
const chalk = require('chalk');
const { createBrowser } = require('./utils');

/**
 * @param {number} count
 * @param {string} url
 * @param {boolean} headless
 * @param {Function} callback
 */
exports.visitPuppeteer = async function visitPuppeteer({ count, url, headless, callback = () => {} }) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1);
	}
	const hrstart = process.hrtime();

  // Using for - of, for better async-await support
  for (const idx of arr) {
		const hrstartSegment = process.hrtime();
    const spinner = ora(`${idx}. Visiting page ${url}`).start();
    const { browser, browserPage } = await createBrowser(headless);
    try {
      await browserPage.goto(url, { waitUntil: 'networkidle2' });
      const res = await browserPage.evaluate(() => {
				return {
					document: document,
					html: new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML,
				};
			});
			callback && callback(res);
			const hrendSegment = process.hrtime(hrstartSegment);
			spinner.succeed(`${idx}. Success visiting the page in ${hrendSegment[0]}s`);
    } catch (error) {
			const hrendSegment = process.hrtime(hrstartSegment);
			spinner.fail(`${idx}. Failed visiting the page in ${hrendSegment[0]}s`);
			console.error(chalk.red(`💥 We got error: `), error);
		}
    await browser.close();
	}

	console.info(chalk.greenBright(`\n🤩 Finish visiting the page!\n`));

	const hrend = process.hrtime(hrstart);
	console.info(chalk.blueBright(`⏱ Total execution time: ${hrend[0]}s`));
};
