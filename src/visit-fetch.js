const ora = require('ora');
const chalk = require('chalk');
const fetch = require('node-fetch');

/**
 * @param {number} count
 * @param {string} url
 * @param {Function} callback
 */
exports.visitFetch = async function visitFetch({ count, url, callback = () => {} }) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1);
	}
	const hrstart = process.hrtime();

  // Using for - of, for better async-await support
  for (const idx of arr) {
		const hrstartSegment = process.hrtime();
    const spinner = ora(`${idx}. Visiting page ${url}`).start();
    try {
			const resp = await fetch(url);
			const body = await resp.text();
			callback && callback(body);
			const hrendSegment = process.hrtime(hrstartSegment);
			spinner.succeed(`${idx}. Success visiting the page in ${hrendSegment[0]}s`);
    } catch (error) {
			const hrendSegment = process.hrtime(hrstartSegment);
			spinner.fail(`${idx}. Failed visiting the page in ${hrendSegment[0]}s`);
			console.error(chalk.red(`💥 We got error: `), error);
		}
	}

	console.info(chalk.greenBright(`\n🤩 Finish visiting the page!\n`));

	const hrend = process.hrtime(hrstart);
	console.info(chalk.blueBright(`⏱ Total execution time: ${hrend[0]}s`));
};
