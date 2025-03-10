#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2));
const { visitPuppeteer } = require('../src/visit-puppeteer');
const { visitFetch } = require('../src/visit-fetch');

const options = argv
  .usage('Usage: visit-me -u [string] [options]')
  .example(
    'visit-me -u https://mazipan.space -c=3',
    'Visit the page several times'
  )
	// URL PARAM
  .alias('u', 'url')
	.describe('url', 'URL to be visit')

	// COUNT PARAM
  .alias('c', 'count')
  .describe('count', 'Visit count')
  .default('c', 1)

	// use mobile device
  .boolean(['m'])
  .alias('m', 'mobile')
  .describe('m', 'Use mobile device')
	.default('m', false)

	// HEADLESS PARAM
  .boolean(['ui'])
  .alias('ui', 'show-ui')
  .describe('ui', 'Show the browser when visiting')
  .default('ui', false)

	// USE FETCH PARAM
  .boolean(['sm'])
  .alias('sm', 'simple-mode')
  .describe('sm', 'Use simple mode, not using Puppeteer')
	.default('sm', false)

	// use Bot UserAgent
  .boolean(['b'])
  .alias('b', 'bot')
  .describe('b', 'Use Bot Google user Agent')
	.default('b', false)

	// URL PARAM
  .alias('ua', 'agent')
	.describe('ua', 'Custom user agent string')
	.default('ua', '')

  .demandOption(['u'])

  .help('h')
  .alias('h', 'help')
  .epilog('Crafted by @mazipan').argv;

if (options.url) {
	if (options.sm) {
		visitFetch({
			count: options.count || 1,
			url: options.url,
		});
	} else {
		visitPuppeteer({
			count: options.count || 1,
			url: options.url,
			headless: !options.ui,
			bot: options.b,
			ua: options.ua,
			mobile: options.m,
		});
	}
}
