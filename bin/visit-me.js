#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2));
const { visit } = require('../src/visit-puppeteer');

const options = argv
  .usage('Usage: visit-me -url [string] [options]')
  .alias('c', 'count')
  .describe('count', 'Visit count')
  .default('c', 1)

  .alias('u', 'url')
  .describe('url', 'URL to be visit')

  .example(
    'visit url https://mazipan.space c=3',
    'Visit the page several times'
  )

  .boolean(['ui'])
  .alias('ui', 'show-ui')
  .describe('ui', 'Show the browser when visiting')
  .default('ui', false)

  .demandOption(['u'])

  .help('h')
  .alias('h', 'help')
  .epilog('Crafted by @mazipan').argv;

if (options.url) {
  visit({
    count: options.count || 1,
    url: options.url,
    headless: !options.ui,
  });
}
